import React, { useEffect } from 'react'
import { Scene, PointLayer } from './l7'
import { Mapbox, GaodeMap } from './l7-maps'
import './sytle.css'
const AntVTest = () => {
  useEffect(() => {
    const scene = new Scene({
      id: 'antv-map',
      map: new Mapbox({
        pitch: 0,
        style: 'dark',
        center: [20, -3.69],
        zoom: 2.5,
      }),
    })

    fetch('https://gw.alipayobjects.com/os/basement_prod/c02f2a20-9cf8-4756-b0ad-a054a7046920.csv')
      .then((res) => res.text())
      .then((data) => {
        const pointLayer = new PointLayer({})
          .source(data, {
            parser: {
              type: 'csv',
              x: 'Long',
              y: 'Lat',
            },
          })
          .size(0.6)
          .color('#ffa842')
          .style({
            opacity: 1,
          })

        scene.addLayer(pointLayer)
      })
  }, [])

  return (
    <div
      id="antv-map"
      style={{ width: '100%', height: '100%', position: 'absolute' }}
      className="wrap"
    ></div>
  )
}

export default AntVTest
