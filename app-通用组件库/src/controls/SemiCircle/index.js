import React, {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState
  } from 'react';
  import moment from 'moment';
  
  const TOKEN = localStorage.getItem('ticket')
  
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  
  const HighchartsReact = forwardRef(
    function HighchartsReact(props, ref) {
      const containerRef = useRef();
      const chartRef = useRef();
  
      useIsomorphicLayoutEffect(() => {
        function createChart() {
          const H = props.highcharts;
          const constructorType = props.constructorType || 'chart';
  
          if (!H) {
            console.warn('The "highcharts" property was not passed.');
  
          } else if (!H[constructorType]) {
            console.warn(
              'The "constructorType" property is incorrect or some ' +
              'required module is not imported.'
            );
          } else if (!props.options) {
            console.warn('The "options" property was not passed.');
  
          } else {
            // Create a chart
            chartRef.current = H[constructorType](
              containerRef.current,
              props.options,
              props.callback ? props.callback : undefined
            );
          }
        }
  
        if (!chartRef.current) {
          createChart();
        } else {
          if (props.allowChartUpdate !== false) {
            if (!props.immutable && chartRef.current) {
              chartRef.current.update(
                props.options,
                ...(props.updateArgs || [true, true])
              );
            } else {
              createChart();
            }
          }
        }
      });
  
      useIsomorphicLayoutEffect(() => {
        return () => {
          // Destroy chart only if unmounting.
          if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
          }
        };
      }, []);
  
      useImperativeHandle(
        ref,
        () => ({
          get chart() {
            return chartRef.current;
          },
          container: containerRef
        }),
        []
      );
  
      // Create container for the chart
      return <div style={{width:'100%',height:'100%'}} {...props.containerProps} ref={containerRef} />;
    }
  );

  if(!window._supLoadMap_) window._supLoadMap_ =new Map();

  const load = (src) => new Promise(function (resolve) {
      const map = window._supLoadMap_;
      if(map.get(src)==='done') return resolve();
      if(Array.isArray(map.get(src))) {
          return map.get(src).push(resolve);
      }
      
      const script = document.createElement('script');
      script.type="text/javascript";
      script.src = src;
      document.body.appendChild(script);
      map.set(src,[resolve]);
      
      script.onload = function(){
          const promises = map.get(src);
          while(promises.length){promises.pop()()}
          map.set(src,'done');
      }
  })
  
  const loadStyle = (href) => new Promise(function (resolve) {
      const map = window._supLoadMap_;
      if(map.get(href)==='down') return resolve();
      const link = document.createElement('link');
      link.href = href;
      map.set(href,'down');
      document.getElementsByTagName('head')[0].appendChild(link);
      resolve();
  })

  const LIB_PATH = '/resource/App_264610095947b7fa572df452f1c87c11/libs'

  loadStyle(`${LIB_PATH}/highcharts.min.css`)
  
  const hcPromise = load(`${LIB_PATH}/highcharts.min.js`)
    .then(() => load(`${LIB_PATH}/highcharts-more.min.js`)
    .then(() => load(`${LIB_PATH}/solid-gauge.min.js`))
    )
  
  const initConfig = {
    chart: {
      backgroundColor: 'transparent',
      // margin: [10, 0, 0, 0]
    },
    credits: {
      enabled: false
    },
    title: {
      style: {
        fontSize: '16px',
        color: '#B7C5DF',
      }
    },
  }

 // 环形图（半圆）配置
 const LINE_OPTIONS = {
    chart: {
        type: 'solidgauge'
    },
    title: {
      enabled: false
    },
    title: null,
    pane: {
        center: ['50%', '92%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
            borderWidth: 0,
            backgroundColor: '#272F3D',
            innerRadius: '60%',
            outerRadius: '110%',
            shape: 'arc'
        }
    },
    tooltip: {
        enabled: false
    },
    yAxis: {
        stops: [
          [0,'#4FE4B3'],
          [1,'#19686A']
        ],
        min: 0,
        max: 100,
        minPadding:20,
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0,
        title: {
            y: -70
        },
    plotBands: [
        {outerRadius: '110%',
             thickness: '5%',
             from: 0,
             to: 50,
             color: '#B63535' // red 
        }, 
        {outerRadius: '110%',
             thickness: '5%',
             from: 50,
             to: 75,
             color: '#FBB113' // yellow
        }, 
        {outerRadius: '110%',
             thickness: '5%',
             from: 75,
             to: 100,
             color: '#4BCF78' // green
      }]    
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
              borderWidth: 0,
              useHTML: true,
              format: '<div style="text-align:center"><span style="font-size:25px;color:#f90;">{y}%</span><br/>',
            }
        },
    }
  }
  
  const SemiCircle = (props) => {
    console.log(props);
    const [Highcharts, initHighcharts] = useState(null);
    const wrapRef = useRef(null);
    const {
      title,
      reloadTime,//定时刷新
      dataSelect
    } = _.get(props.data.getAttrObject(),'data',{});

  
    const [op, setOp] = useState(_.merge({}, initConfig, LINE_OPTIONS, { title: { text:title} }))

    function useGetData() {
        scriptUtil.executeScriptService({
          objName:`${dataSelect.selectedTemplate.namespace}.${dataSelect.selectedTemplate.name}`, 
          // 对象实例
          serviceName:`${dataSelect.selectedProp.namespace}.${dataSelect.selectedProp.name}`, // 服务
          version: 'V2',
           // 回调函数
           cb:function(res){
               console.log(`${dataSelect.selectedTemplate.namespace}.${dataSelect.selectedTemplate.name}`,'aaaaa')
               console.log(`${dataSelect.selectedProp.namespace}.${dataSelect.selectedProp.name}`,'bbbbb')
            setOp(op => {
              return _.merge({}, op,{
                series:res.list||res.data||[]
              } )
            });
           }
           // 可自定义补充请求参数
          })
      }
      useEffect(() => {
        hcPromise.then(() => initHighcharts(window.Highcharts))
      }, [
        initHighcharts
      ])
      useEffect(() => {
        if(dataSelect){
            useGetData();
            if(reloadTime) {
                const myVar = setInterval(() => {
                    if(!reloadTime) {
                        clearInterval(myVar);
                    }
                    useGetData();
                }, reloadTime * 1000);
            }
        }

    }, [
      setOp,
      reloadTime,//定时刷新
      dataSelect
    ])
  
    useEffect(() => {
      if (wrapRef && wrapRef.current) {
        ["touchstart", "touchmove", "touchend"].forEach((event) => {
          wrapRef.current.addEventListener(event, (e) => {
            e.stopPropagation();
          });
        })
      }
    }, [
      wrapRef
    ])
  
    useLayoutEffect(() => {
      let container = document.getElementById('box')
      if (container) {
        container.parentElement.style.height = "100vh"
        container.parentElement.style.maxHeight = "100vh"
        container.parentElement.style.position = "relative"
        container = container.parentElement
        while (container) {
          container.style.height = "100vh"
          container = container.parentElement
        }
      }
    }, [])
  
    const chartResizeRerender = useCallback((chart) => {
      window.addEventListener('resize', () => chart.reflow())
    }, [])
  
  
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={op}
        callback={chartResizeRerender}
      />
    )
  }
  
  export default memo(SemiCircle);