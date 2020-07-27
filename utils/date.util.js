
export class DateUtil {
  /**
   * 获取当前时间对象
   * @param longTypeDate
   * @returns {string}
   */
   static getDate(longTypeDate) {
    const date = new Date();
    date.setTime(longTypeDate);
    return date;
  }
  /**
   * yyyy年MM月dd日 hh:mm:ss
   * @param longTypeDate
   * @returns {string}
   */
   static datetimeFormat_1(longTypeDate) {
    let datetimeType = '';
    const date = this.getDate(longTypeDate);
    datetimeType += date.getFullYear();   // 年
    datetimeType += '-' + this.getMonth(date); // 月
    datetimeType += '-' + this.getDay(date);   // 日
    datetimeType += '  ' + this.getHours(date);   // 时
    datetimeType += ':' + this.getMinutes(date);      // 分
    datetimeType += ':' + this.getSeconds(date);      // 分
    return datetimeType;
  }

  /**
   * HH:mm:ss
   */
   static dateFormatHMS(longTypeDate) {
    let datetimeType = '';
    const date = this.getDate(longTypeDate);
    datetimeType += '  ' + this.getHours(date);   // 时
    datetimeType += ':' + this.getMinutes(date);      // 分
    datetimeType += ':' + this.getSeconds(date);      // 分
    return datetimeType;
  }
  /**
   * HH
   */
   static dateFormatH(longTypeDate) {
    let datetimeType = '';
    const date = this.getDate(longTypeDate);
    datetimeType += '  ' + this.getHours(date);   // 时
    return datetimeType;
  }
  /**
   * yyyy-MM-dd
   * @param longTypeDate
   * @returns {string}
   */
   static dateFormat(longTypeDate) {
    const date = this.getDate(longTypeDate);
    const dateType = date.getFullYear() + '-' + this.getMonth(date) + '-' + this.getDay(date); // yyyy-MM-dd格式日期
    return dateType;
  }

  // 返回 01-12 的月份值
   static getMonth(date) {
    const month = date.getMonth() + 1; // getMonth()得到的月份是0-11
    return this.setTimeFillZero(month);
  }

  // 返回01-30的日期
   static getDay(date) {
    const day = date.getDate();
    return this.setTimeFillZero(day);
  }

  // 返回小时
   static getHours(date) {
    const hours = date.getHours();
    return this.setTimeFillZero(hours);
  }

// 返回分
   static getMinutes(date) {
    const minute = date.getMinutes();
    return this.setTimeFillZero(minute);
  }

// 返回秒
   static getSeconds(date) {
    const second = date.getSeconds();
    return this.setTimeFillZero(second);
  }
  
  // 返回分
     static getFullYear(date) {
      const minute = date.getFullYear();
      return this.setTimeFillZero(minute);
    }
	
   static setTimeFillZero(num) {
    return num < 10 ? '0' + num : num;
  }
}

