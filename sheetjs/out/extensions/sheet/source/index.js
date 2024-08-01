import React, { useState, useEffect } from 'react'
import XLSX from './xlsx'
const ExcelReader = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    console.log('data', data)
  }, [data])
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      setData(excelData)

      excelData.forEach((v, index) => {
        if (index > 0) {
          add(v[1])
        }
      })
    }

    reader.readAsBinaryString(file)
  }

  const add = (name) => {
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
    scriptUtil.request(url, param).then((res) => {
      console.log(res)
    })
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
