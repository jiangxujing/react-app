import React, {
	Component
} from 'react';
import '../css/addBankList.scss'
import api from '../common/api.js'
import {dateFormatter} from '../common/utils.js'
class AddBankList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
	}
	render() {
		return(
			<div className="addBankList">
				<div style={{width:'100%',background:'#fff'}}>
					<div className="bankCardList">
						<span style={{paddingLeft:'1.5rem',color:'#1A2833',fontSize:'1.4rem',fontWeight:'400'}}>请选择开户行</span>
						<img src={require('../image/arrow.png')} style={{width:'2.2rem',float:'right',marginRight:'1rem',marginTop:'2rem'}}/>
					</div>
				</div>
            </div>
		);
	}
}

export default AddBankList;