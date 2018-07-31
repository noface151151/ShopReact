import ProductAdminComponent from '../../../components/admin/Products/Product';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const mapStateToProps=state=>{
    return{
        products:state.product.products,
        loading:state.product.loading,
        isSuccess:state.product.isSuccess,
        loadingAddEdit:state.product.loadingAddEdit
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchProducts:()=>dispatch(actions.Product_GetList()),
        onAddProduct:(product)=>dispatch(actions.Product_Add(product)),
        onAddProductEnd:()=>dispatch(actions.Product_Add_End())
    }
}


const ProductAdminContainer= connect(mapStateToProps,mapDispatchToProps)(ProductAdminComponent);
export default ProductAdminContainer;

