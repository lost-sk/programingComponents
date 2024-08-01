import React, { useState, useEffect } from 'react'
import XLSX from './xlsx'
const ExcelReader = () => {
  const [data, setData] = useState([])
  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])

  const filterData = (lists) => {
    const newDatas = lists.filter((l) => l[0] !== null)
    return newDatas
  }
  // 有合并单元格的 拆开填充到每个单元格
  const expandMergedCells = (ws) => {
    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let row = range.s.r; row <= range.e.r; ++row) {
      for (let col = range.s.c; col <= range.e.c; ++col) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col })
        let cell = ws[cellRef]
        if (!cell) {
          const mergeCells = ws['!merges'] || []
          for (let i = 0; i < mergeCells.length; i++) {
            const mergeCell = mergeCells[i]
            const { s, e } = mergeCell
            if (row >= s.r && row <= e.r && col >= s.c && col <= e.c) {
              const topRef = XLSX.utils.encode_cell(s)
              const topCell = ws[topRef]
              if (topCell) {
                ws[cellRef] = JSON.parse(JSON.stringify(topCell))
                break
              }
            }
          }
        }
      }
    }
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]

      expandMergedCells(worksheet)

      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null })
      const newExcelData = filterData(excelData)
      setData(newExcelData)
      console.log('newExcelData', newExcelData)
      // excelData.forEach((v, index) => {
      //   if (index > 0) {
      //     add(v[1])
      //   }
      // })
    }

    reader.readAsArrayBuffer(file)
  }

  const add = async (name) => {
    var url = '/open-api/p/compose/v2alpha1/resources/scriptExec'
    var param = {
      method: 'POST', //请求类型，可选GET、POST、PUT、DELETE
      body: {
        resourceName: 'mariadb_1',
        scriptName: 'sql_2',
        params: {
          name,
        },
      },
    }
    return scriptUtil.request(url, param)
  }
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <table>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ExcelReader
