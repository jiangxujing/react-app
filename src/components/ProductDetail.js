import React, {
	Component
} from 'react';
import '../css/productDetail.scss'
import api from '../common/api.js'
import { getQueryString } from '../common/utils.js'
class ProductDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packageDetail: {},
			giftPackageDetailList: [],
			merberImg: '',
			ruleImg: [],
			giftPackageDTOList: [],
			type:0,
			shareShow:'none'
		};
	}
	componentDidMount() {
		this.getPackageDetail()
	}
	componentWillMount () {
		this.props.history.listen(route => {
			this.getPackageDetail()
		})
	  }
	getPackageDetail() {
		let req = {
			packageCode: getQueryString('packageCode')
		}
		api.post(api.getUrl('queryPackage', '/collections-web'), req).then(res => {
			let detailsPicture = []
			let ruleImg = []
			if(res.content.giftPackageDTODetails.detailsPicture){
				detailsPicture = res.content.giftPackageDTODetails.detailsPicture.split(',')
				console.log(detailsPicture)
				for (var i = 1; i < detailsPicture.length; i++) {
					ruleImg.push(detailsPicture[i])
				}
			}
			this.setState({
				packageDetail: res.content.giftPackageDTODetails,
				giftPackageDetailList: res.content.giftPackageDTODetails.giftPackageDetailList,
				merberImg: detailsPicture[0],
				ruleImg: ruleImg,
				giftPackageDTOList: res.content.giftPackageDTOList,
				type:res.content.homepageUrl.type
			})
		}).catch(() => { })
	}
	getNewPackageDetail=(value)=>{
		this.props.history.push('ProductDetail?packageCode='+value.packageCode)
		//this.props.history.go()
	}
	getShare=(e)=>{
		e.stopPropagation();
		this.setState({
			shareShow:'block'
		})
	}
	closeShareBox=()=>{
		this.setState({
			shareShow:'none'
		})
	}
	render() {
		return (
			<div className="productDetail">
				<div style={{ padding: '1.5rem' }}>
					<img alt="header" src={this.state.packageDetail.headPicture} style={{ width: '100%' }} />
					<div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
						<img src={require('../image/gou.png')} style={{ width: '1.2rem' }} /><span style={{ fontSize: '1.2rem', color: '#8A9399', paddingLeft: '0.4rem' }}>随时退</span>
						<img src={require('../image/gou.png')} style={{ width: '1.2rem', marginLeft: '1.8rem' }} /><span style={{ fontSize: '1.2rem', color: '#8A9399', paddingLeft: '0.4rem' }}>随时退</span>
						<span style={{ fontSize: '1.2rem', color: '#8A9399', paddingTop: '0.5rem', float: 'right' }}>{this.state.packageDetail.initSalesCount}人购买</span>
					</div>
				</div>
				<div className="gray-jianju"></div>
				<div className="giftPackage">
					<div className="gift-detail">礼包说明</div>
					<div className="gift-content">
						<div className="gift-title">{this.state.packageDetail.name}</div>
						{
							this.state.giftPackageDetailList.map((value, key) => {
								return (
									<div key={key}>
										<div style={{ width: '100%', overflow: 'hidden', paddingBottom: '2rem' }} >
											<div className="gift-left">
												<img src={require('../image/double.png')} style={{ width: '0.8rem' }} />
												<span>{value.goodsName}</span>
											</div>
											<div className="gift-right">
												<span>{value.goodsCount}{value.goodsUnit}|</span>
												<span>￥{value.goodsPrice}</span>
											</div>
										</div>

									</div>
								)
							})

						}
						<div className="border-style"></div>
						<div style={{ color: '#8A9399', fontSize: '1.4rem', paddingTop: '2rem' }}>
							<span style={{ color: '#8A9399', fontSize: '1.4rem' }}>会员礼包价</span>
							<div style={{ float: 'right' }}>
								<span style={{ color: '#8A9399', fontSize: '1.2rem' }}>原价￥{this.state.packageDetail.originalPrice / 100}</span>
								<span style={{ color: '#FF7B31', fontSize: '1.4rem', fontWeight: '600' }}>￥{this.state.packageDetail.salesPrice / 100}</span>
							</div>
						</div>
					</div>
					<img alt="merber" src={this.state.merberImg} style={{ width: '100%', padding: '1.5rem',display:this.state.merberImg?'block':'none' }} />
					<div className="gray-jianju"></div>
					<div className="product-rule" style={{display:!!this.state.ruleImg && this.state.ruleImg.length>0?'display':'none'}}>产品使用规则</div>
					{
						this.state.ruleImg.map((value, key) => {
							return (
								<div key={key}>
									<img src={value} style={{ width: '100%', padding: '1.5rem 1.5rem 0 1.5rem' }} />
								</div>
							)
						})
					}
					<div className="gray-jianju"></div>
					<div className="product-rule">其他礼包</div>
				<div style={{marginBottom:'5rem'}}>
				{
						this.state.giftPackageDTOList.map((value, key) => {
							return (
								<div className="other-gift-package" key={key} onClick={this.getNewPackageDetail.bind(this,value)}>
									<div className="gift-left">
										<div className="gift-img-price">
											<img className="gift-img" src={require('../image/other-package.jpg')} />
											<div className="price-right">
												<div className="sale-price" style={{ color: '#FF7B31', fontWeight: 'bold', lineHeight: '1' }}>
													<span style={{ fontSize: '1.8rem' }}>¥</span><span style={{ fontSize: '3rem' }}>{value.salesPrice / 100}</span>
													<span style={{ fontSize: '1.4rem', fontWeight: '400' }}>会员礼包</span>
												</div>
												<div style={{ color: '#8A9399', fontSize: '1.2rem', paddingTop: '3px' }}>原价¥{value.originalPrice / 100}</div>
											</div>
										</div>
									<div style={{paddingTop: '1.7rem' }}>
										{
											value.giftPackageDetailList.map((v,k)=>{
												return (
													<div key={k} style={{ fontSize: '1.2rem', color: '#475966' }}>{v.goodsName}*{v.goodsCount}</div>
												)
											})
										}
									</div>
									</div>
									<div className="gift-right">
										<div style={{ color: '#8A9399', fontSize: '1.2rem' }}>{value.initSalesCount}人购买</div>
										{
											this.state.type===2?<button className="share-btn" onClick={(event) => {
												event.stopPropagation();
											}} onClick={(e)=>this.getShare(e)}>立即分享</button>:<button className="share-btn">立即购买</button>
										}
									</div>
								</div>
							)
						})
					}
				</div>
				</div>
				<div className="fix-btn">
				<button>¥{this.state.packageDetail.salesPrice/100}成为代理</button>
					<img src={require('../image/share.png')} style={{ width: '5.8rem' }} />
				</div>
				<div className="share-wrapper" style={{display:this.state.shareShow}} onClick={this.closeShareBox}>
					<div className="share-content">
						<div>-分享至-</div>
						<div>
							<img src={require('../image/weixin.png')} style={{width:'5rem'}}/>
							<img src={require('../image/friend.png')} style={{width:'5rem'}}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ProductDetail;