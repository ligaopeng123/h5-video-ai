<template>
	<view class="pahone-center">
		<view v-for="(item, index) in phoneList" :key="index"><text>拨打电话：</text><text @tap="makePhoneCall(item)">{{item}}</text></view>
	</view>
</template>
<script>
	var _this;
	export default {
		data() {
			return {
				phoneList: []
			}
		},
		onLoad(e) {
			_this = this;
			_this.phoneList = JSON.parse(e.item);
		},
		methods: {
			makePhoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			}
		}
	}
</script>

<style>
	.pahone-center {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pahone-center>view {
		width: 100%;
		padding: 8px;
		display: block;
		text-align: center;
		border-bottom: solid 1px #cccc;
	}
	
	.pahone-center>view>text:last-child{
		color: #007AFF;
	}
</style>
