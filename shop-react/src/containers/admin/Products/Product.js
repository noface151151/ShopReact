import ProductAdminComponent from '../../../components/admin/Products/Product';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const mapStateToProps=state=>{
    return{
        products:state.product.products,
        loading:state.product.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchProducts:()=>dispatch(actions.Product_GetList())
    }
}


const ProductAdminContainer= connect(mapStateToProps,mapDispatchToProps)(ProductAdminComponent);
export default ProductAdminContainer;

