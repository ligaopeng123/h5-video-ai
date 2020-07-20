/**
 *@模块名称：VideoRecognitionService
 *
 *@创建人：ligaoming
 *
 *@作用：管理视频识别类型
 *
 *@date 2018/10/26
 *
 *@版权所有：长杨科技
 */

export default class VideoRecognitionService {
	constructor(lableData) {
		const defaultType = {};
		const colors = [];
		lableData.forEach((item, index) => {
			defaultType[item.value] = item.label;
			colors.push(item.color)
		});
		this.colors = colors;
		this.defaultType = defaultType;
		this.lableKey = Object.keys(this.defaultType);
		this.lableKeyStr = this.lableKey.join(',');
	}
	colors;
	defaultType;
	/**
	 * 所有常用参数都引入缓存机制  节省性能
	 */
	defaultTypeHelper;

	// 缓存辅助
	valueKeyCache;

	/**
	 * 移动端不支持values方法 使用缓存处理
	 * @returns {any}
	 */
	get valueKey() {
		if (this.valueKeyCache) {
			return this.valueKeyCache;
		}
		this.valueKeyCache = this.getObjValues(this.defaultType);
		return this.valueKeyCache;
	};



	getObjValues(data) {
		const arr = [];
		for (let key in data) {
			arr.push(data[key]);
		}
		return arr;
	}
	/**
	 * 根据lable获取value的值
	 * @returns {any}
	 */
	get getLableByValue() {
		if (this.defaultTypeHelper) {
			return this.defaultTypeHelper;
		} else {
			return this.packageItem(null, null, 'object');
		}
	}

	/**
	 * 组装数据
	 * @param lablekey
	 * @param valuekey
	 * @param type
	 */
	packageItem(lablekey, valuekey, type) {
		let defaultTypeHelper;
		if (type === 'array') {

		} else {
			defaultTypeHelper = {};
		}
		for (let key in this.defaultType) {
			if (type === 'array') {
				if (!defaultTypeHelper) {
					defaultTypeHelper = [];
				}
				const helperObj = {};
				helperObj[lablekey] = key;
				helperObj[valuekey] = this.defaultType[key];
				defaultTypeHelper.push(helperObj);
			} else {
				if (!defaultTypeHelper) {
					defaultTypeHelper = {};
				}
				defaultTypeHelper[this.defaultType[key]] = key;
			}
		}
		return defaultTypeHelper;
	}
	/**
	 * 获取lable value对应的数据
	 * @returns {{label01: string; label02: string; label03: string;
	 * label04: string; label05: string; label06: string; label07: string;
	 * label08: string; label09: string; label10: string; label11: string;
	 * label12: string; label13: string; label14: string; label15: string;
	 * label16: string; label17: string}}
	 */
	get getValueByLable() {
		return this.defaultType;
	}

	/***
	 * 获取列表数据每一条的label集合
	 * @return {{label01:1,label02:0，label03:0，label04:0}}
	 */
	getDisposeTags(params) {
		let tagStr = '';
		for (const i in this.defaultType) {
			if (tagStr) {
				tagStr += ',';
			}
			tagStr += i;
		}
		let labels = tagStr.split(',');
		let obj = {};
		labels.forEach(lable => {
			for (let key in params) {
				if (key === lable) {
					obj[key] = params[key]
				}
			}
		})
		return obj;
	}

	/**
	 * 根据lable获取value的值
	 * @param {string} key
	 * @returns {any | string}
	 */
	labelChange(key) {
		return this.getValueByLable[key] || key;
	}

	/**
	 * 将标签汉字转换为label
	 * @param {string} key
	 * @returns {any | string}
	 */
	valueChange(key) {
		return this.getLableByValue[key] || key;
	}

	/**
	 * 返回拼接好的事件名
	 * @param rows
	 * @returns {string}
	 */
	getLabelStringByRows(rows) {
		return rows.device_name + '| ' + this.getDeviceNameLabel(rows);
	}

	/**
	 * @函数名称：getDeviceNameLabel
	 * @param
	 * @作用：lable拼接
	 * @return：obj
	 * @date 2018/7/19
	 */
	getDeviceNameLabel(rows) {
		const labelObj = this.getValueByLable;
		let eventInfo = '';
		for (const key in labelObj) {
			if (rows[key] > 0) {
				eventInfo += '[' + labelObj[key] + '] ';
			}
		}
		return eventInfo;
	}

	/**
	 * 缓存
	 */
	labelJson;

	/**
	 * 获取label与文字的label，value键值对
	 * @returns {any}
	 */
	get getLabelJson() {
		if (this.labelJson) {
			return this.labelJson;
		} else {
			return this.packageItem('label', 'value', 'array');
		}
	}

	/**
	 * 判断lable的值是否全为0 全为0则空数据显示
	 * @param res
	 * @returns {boolean}
	 */
	ifLabelEmpty(res) {
		if (res && res.data) {
			for (const key in res.data) {
				if (res.data[key] !== undefined && res.data[key] !== 0) {
					return false;
				}
			}
			return true;
		}
	}

	/**‘
	 * 缓存
	 */
	sumFields;

	/**
	 * 获取sumFields的集合
	 * @returns {any}
	 */
	get getSumFields() {
		if (this.sumFields) {
			return this.sumFields;
		}
		const len = this.lableKey.length - 1;
		const sumFields = [];
		for (let i = len; i >= 0; i--) {
			const itemI = this.lableKey[i];
			const lable = 'label' + itemI;
			sumFields.push({
				f: 'sum(' + itemI + ')',
				v: itemI
			});
		}
		this.sumFields = JSON.stringify(sumFields);
		return this.sumFields;
	}
};
