import { DateUtil } from './date.util';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
class Utils {


  constructor() {}

  /**
   *@函数名称：
   *@参数：
   *@作用：利用对象原型的toString方法来判断数据类型
   *@date 2018/5/17
   */
  
  toString = Object.prototype.toString;
  /**
   *@函数名称：
   *@参数：
   *@作用：IE6 使用toString判断是Object
   *@date 2018/5/17
   */
   isObject = function(val) {
    return this.toString.call(null) === '[object Object]'
      ? val !== null &&
      val !== undefined &&
      this.toString.call(val) === '[object Object]' &&
      val.ownerDocument === undefined // 排除dom
      : this.toString.call(val) === '[object Object]';
  };
  /**
   * 判断是否是数组
   * @param val
   * @returns {boolean}
   */
   isArray = function(val) {
    return 'isArray' in Array
      ? Array.isArray(val)
      : this.toString.call(val) === '[object Array]';
  };
  /**
   *
   * @param val
   * @returns {boolean}
   */
   isString(val) {
    return typeof val === 'string';
  }
  /**
   *@函数名称：isUndefined
   *@参数：
   *@作用：判断是不是没有赋值
   *@date 2018/5/18
   */
   isUndefined(val) {
    return typeof val === 'undefined';
  }
  /**
   * Safari 3.x 4.x type判断dom返回的是function
   * @param val
   * @returns {boolean}
   */
   isFunction = function(val) {
    return typeof document !== 'undefined' &&
    typeof document.getElementsByTagName('body') === 'function'
      ? !!val && toString.call(val) === '[object Function]'
      : !!val && typeof val === 'function';
  };
  /**
   * 判断是否为布尔值
   * @param val
   * @returns {boolean}
   */
   isBoolean = function(val) {
    return typeof val === 'boolean';
  };
  /**
   * 判断数字
   * @param val
   * @returns {boolean}
   */
   isNumber = function(val) {
    return typeof val === 'number' && isFinite(val);
  };
  /**
   * 判断dom  nodeType 属性可返回节点的类型。
   * @param val
   * @returns {boolean}
   元素类型     节点类型
   元素element       1
   属性attr          2
   文本text          3
   注释comments      8
   文档document      9
   */
   isElement = function(val) {
    return val ? val.nodeType === 1 : false;
  };
  /**
   * 字符串为“”，数组为空数组
   * @param val
   */
   isEmpty = function(val) {
    return (
      val === null || val === '' || (this.isArray(val) && val.length === 0)
    );
  };
  /**
   * 判断是不是空对象
   * @param val
   * @returns {boolean}
   */
   isEmptyObject = function(val) {
    return JSON.stringify(val) === '{}';
  };
  /**
   * 深层属性拷贝
   * @param object
   * @param config
   * @param defaults
   */
   apply = function(object, config, defaults) {
    // ES6 使用新方法实现该功能
    if (Object.assign) {
      if (defaults) {
        Object.assign(object, config, defaults);
      } else {
        Object.assign(object, config);
      }
      return object;
    }
    const enumerables = [
      'valueOf',
      'toLocaleString',
      'toString',
      'constructor',
    ];
    // 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    if (defaults) {
      this.apply(object, defaults);
    }
    if (object && config && this.isObject(config)) {
      let i, j, k;
      for (i in config) {
        object[i] = config[i];
      }
      /**
       * 处理可枚举属性的copy
       */
      if (enumerables) {
        for (j = enumerables.length; j--; ) {
          k = enumerables[j];
          if (config.hasOwnProperty(k)) {
            object[k] = config[k];
          }
        }
      }
    }
  };
  /**
   * 浅层属性拷贝
   * @param object
   * @param config
   * @returns {*}
   */
   applyIf = function(object, config) {
    let property;
    if (object) {
      for (property in config) {
        if (object[property] === undefined) {
          object[property] = config[property];
        }
      }
    }
    return object;
  };
   getTimeStamp(type) {
    const thisDayZore =
      Number(new Date(new Date().setHours(0, 0, 0, 0))) / 1000;
    let num = 0;
    if (this.isNumber(type)) {
      num = type;
    } else if (this.isString(type)) {
      const data = {
        day: 1,
        week: 7,
        month: 30,
        year: 365,
      };
      num = data[type];
    } else {
    }
    return {
      startTime: (Number(thisDayZore) - num  * 86400) * 1000, // (Number(thisDayZore) - num  * 86400) * 1000, 1502640000000 ---- 1502726400000
      endTime: (Number(thisDayZore) + 86400) * 1000 // (Number(thisDayZore) + 86400) * 1000
    };
  }

  /**
   *@函数名称：timestampToTime
   *@参数：timestamp时间戳 type时间格式 yyyy-MM-dd yyyy-MM-dd HH:mm:ss HH:mm:ssv  HH
   *@作用：将时间戳转换成日期
   *@date 2018/5/21
   */
   timestampToTime(timestamp, type) {
    // DateUtil.dateFormat(timestamp)
    const time = {
      'yyyy-MM-dd': 'dateFormat',
      'yyyy-MM-dd HH:mm:ss': 'datetimeFormat_1',
      'HH:mm:ss': 'dateFormatHMS',
      HH: 'dateFormatH',
    };
    if (this.isString(type) && time[type]) {
      return DateUtil[time[type]](timestamp);
    } else {
      return DateUtil[time['yyyy-MM-dd HH:mm:ss']](timestamp);
    }
  }
  /**
   *@函数名称：toThousands
   *@参数：value Number  num,小数点精确到几位数
   *@作用：将数字格式化成千位符号进行展示
   *@date 2018/5/22
   */
   toThousands(value, digit) {
    value = Number(value);
    const num = (value || 0).toFixed(digit || 0).toString();
    let result = '';
    let integer = num.match(/(\S*)\./);
    let decimal = '';
    // 将字符串从'.'断开 用点之前的数据做分割处理，最后再加上小数点后面的数字
    if (integer) {
      integer = integer[1];
      decimal = num.match(/\.(\S*)/)[0]; // 拿到小数点后面的数字
    } else {
      integer = num;
    }
    while (integer.length > 3) {
      result = ',' + integer.slice(-3) + result;
      integer = integer.slice(0, integer.length - 3);
    }
    if (integer) {
      result = integer + result;
    }
    return result + decimal;
  }
  /**
   * @param key 模块传入key值，获取相当应的颜色，方便统一管理
   * @returns {any}
   */
  __colorChche;
   getColor(key) {
    if (!this.__colorChche) {
      let color = {
        // tag的颜色
        tag: [
          '#C52B5D',
          '#CF3D0F',
          '#DC7D23',
          '#B30FCF',
          '#8510D0',
          '#4F46A4',
          '#6363A9',
          '#1057CF',
          '#1775AD',
          '#10A5CF',
          '#18ADA8',
          '#18AD5E',
          '#64A926',
          '#65D88D',
        ],
        危急: '#C52B5D', // 告警色
        高危: '#DC7D23',
        中危: '#10A5CF',
        低危: '#18AD5E',
        未知: '#65D88D',
        text: 'rgba(255, 255, 255, 1)', // 文本色
        color: [
          // 图形颜色
          '#1057CF',
          '#C52B5D',
          '#DC7D23',
          '#18AD5E',
          '#CF3D0F',
          '#18ADA8',
          '#6363A9',
        ],
        muchBarColor: [
          // 并列柱子的颜色
          // '#C52B5D',
          // '#CF3D0F',
          // '#DC7D23',
          // '#B30FCF',
          // '#8510D0',
          // '#4F46A4',
          // '#6363A9',
          // '#1057CF',
          // '#1775AD',
          // '#10A5CF',
          // '#18ADA8',
          // '#18AD5E',
          // '#64A926',
          // '#65D88D'
          '#1057CF',
          '#C52B5D',
          '#DC7D23',
          '#18AD5E',
          '#CF3D0F',
          '#18ADA8',
          '#6363A9',
        ],
        background: '#14212A', // 背景色
      };
      color = this.apply(color, BusinessMapping.DETECTIONLABLEColor(), {});
      this.__colorChche = color;
    }
    const color = this.__colorChche;
    if (key && color[key]) {
      return color[key];
    } else {
      return color['color'];
    }
  }

  /**
   * 告警排序
   * @param obj
   * @returns {any}
   */
   sortAlarmObj(obj) {
    const data = {
      危急: 0,
      高危: 0,
      中危: 0,
      低危: 0,
      未知: 0,
    };
    const d = this.apply(data, obj, {});
    return d;
  }
  /**
   * copy 解除引用
   * @param val
   * @returns {*}
   */
   clone = function(val) {
    return JSON.parse(JSON.stringify(val));
  };
   cloneAllObject = function(val) {
    const obj = {};
    let item;
    for (const k in val) {
      item = val[k];
      if (this.isArray(item)) {
        // 判断数组
        obj[k] = this.cloneAllArray(item);
      } else if (this.isObject(item)) {
        obj[k] = this.cloneAllItems(item);
      } else {
        obj[k] = item;
      }
    }
    return item;
  };
  cloneAllArray = function(val) {
    /**
     * 解除数组关系的引用
     * @type {Array.<T>}
     */
    const arr = Array.prototype.slice.call(val),
      newArr = [],
      len = arr.length;
    for (let i = 0; i < len; i++) {
      const item = arr[i];
      if (this.isArray(item)) {
        newArr.push(this.cloneAllArray(item));
      } else if (this.isObject(item)) {
        newArr.push(this.cloneAllObject(item));
      } else {
        newArr.push(val);
      }
    }
    return newArr;
  };
  /**
   * 深度copy
   * @param val
   * @returns {*}
   */
   cloneAllItems = function(val) {
    // 解除引用
    val = this.clone(val);
    if (this.isArray(val)) {
      this.cloneAllArray(val);
    } else if (this.isArray(val)) {
      this.cloneAllObject(val);
    }
    return val;
  };
  /**
   * 判断是否支持排序，主要是判断浏览器差异的
   * @type {boolean}
   */
   supportsSort = (function() {
    const a = [1, 2, 3, 4, 5].sort(function() {
      return 0;
    });
    return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
  })();
  /**
   * Sorts the elements of an Array.
   * By default, this method sorts the elements alphabetically and ascending.
   *
   * @param {Array} array The array to sort.
   * @param {Function} sortFn (optional) The comparison function.
   * @param {Mixed} sortFn.a An item to compare.
   * @param {Mixed} sortFn.b Another item to compare.
   * @return {Array} The sorted array.
   */
   sort = this.supportsSort
    ? function(array, sortFn) {
      if (sortFn) {
        return array.sort(sortFn);
      } else {
        return array.sort();
      }
    }
    : function(array, sortFn) {
      const length = array.length;
      let i = 0,
        comparison,
        j,
        min,
        tmp;

      for (; i < length; i++) {
        min = i;
        for (j = i + 1; j < length; j++) {
          if (sortFn) {
            comparison = sortFn(array[j], array[min]);
            if (comparison < 0) {
              min = j;
            }
          } else if (array[j] < array[min]) {
            min = j;
          }
        }
        if (min !== i) {
          tmp = array[i];
          array[i] = array[min];
          array[min] = tmp;
        }
      }

      return array;
    };

  /**
   * 获取自动登录字段缓存
   * @returns {boolean}
   */
   getAutoLogin() {
    const autoLogin = localStorage.getItem('autoLogin');
    if (autoLogin === 'true') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 设置自动登录本地缓存
   * @param val
   */
   setAutoLogin(val) {
    localStorage.setItem('autoLogin', val);
  }

  /**
   * 获取指定范围内的随机数，主要用于deom数据模拟
   * @param min
   * @param max
   * @returns {number}
   */
   getRandomNum(min, max) {
    min = min || 0;
    max = max || 10;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /**
   * @函数名称：getDeviceNameLabel
   * @param
   * @作用：title名称获取
   * @return：obj
   * @date 2018/7/19
   */
  getDeviceNameTitle(single) {
    return single['device_name'] + ' | 预警';
  }
  /**
   * @函数名称：getDeviceNameLabel
   * @param
   * @作用：lable拼接
   * @return：obj
   * @date 2018/7/19
   */
   getDeviceNameLabel(single) {
    let label = '';
    if(single.label01 === 1) {
      label += '烟雾 ';
    }
    if(single.label02 === 1) {
      label += '火焰 ';
    }
    if(single.label03 === 1) {
      label += '边界入侵 ';
    }
    if(single.label04 === 1) {
      label += '阀门移位 ';
    }
    if(single.label05 === 1) {
      label += '漏油 ';
    }
    if(single.label06 === 1) {
      label += '劳保穿戴 ';
    }
    if(single.label07 === 1) {
      label += '人数识别 ';
    }
    if(single.label08 === 1) {
      label += '气体泄漏 ';
    }
    if(single.label09 === 1) {
      label += '动火许可检测 ';
    }
    if(single.label10 === 1) {
      label += '危化品倾洒与移动 ';
    }
    if(single.label11 === 1) {
      label += '车辆出入检测 ';
    }
    if(single.label12 === 1) {
      label += '车位入库检测 ';
    }
    if(single.label13 === 1) {
      label += '消防通道堵塞 ';
    }
    if(single.label14 === 1) {
      label += '陌生人识别 ';
    }
    return label;
  }
}


export default new Utils()