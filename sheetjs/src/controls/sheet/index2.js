import React, { useState, useEffect } from 'react'
import { Progress, message } from 'antd'
import XLSX from './xlsx'
const ExcelReader = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    console.log('data', data)
  }, [data])
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null })

      setData(excelData)

      // excelData.forEach((v, index) => {
      //   if (index > 0) {
      //     add(v[1])
      //   }
      // })
    }

    reader.readAsBinaryString(file)
  }

  const add = (NO, PRO_CODE, PRO_GROUP_CODE, ROBORT1_CODE, ROBORT2_CODE, ROBORT3_CODE, index) => {
    var url = '/open-api/p/compose/v2alpha1/resources/scriptExec'
    var param = {
      method: 'POST',
      body: {
        resourceName: 'sqlserver_1',
        scriptName: 'sql_104',
        params: {
          NO,
          PRO_CODE,
          PRO_GROUP_CODE,
          ROBORT1_CODE,
          ROBORT2_CODE,
          ROBORT3_CODE,
        },
      },
    }
    console.log('add:', index, param)
    return scriptUtil.request(url, param)
  }

  const addAll = async () => {
    var url = '/open-api/p/compose/v2alpha1/resources/scriptExec'
    var param = {
      method: 'POST',
      body: {
        resourceName: 'sqlserver_1',
        scriptName: 'sql_105',
        params: {},
      },
    }
    scriptUtil.request(url, param).then(async (res) => {
      try {
        setLoading(true)
        for (let n = 0; n < data.length; n++) {
          if (n > 1) {
            setPercent(Math.floor((n / data.length) * 100))
            await add(data[n][0], data[n][1], data[n][2], data[n][3], data[n][4], data[n][5], n)
          }
        }
        setLoading(false)
        message.success('导入成功')
      } catch (err) {
        setLoading(false)
        message.error('导入失败，请重新导入')
      }
      //       data.forEach((v, index) => {
      //         if (index > 1) {
      //             await add(v[0], v[1], v[2], v[3],v[4], v[5],index)
      //         }
      //       })
    })
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={addAll} style={{ width: '50px' }}>
          添加
        </button>
      </div>
      {loading && <Progress percent={percent} />}
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
