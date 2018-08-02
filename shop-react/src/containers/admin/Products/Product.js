import {connect} from 'react-redux';
import axios from 'axios';
import ProductAdminComponent from '../../../components/admin/Products/Product';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler';

const mapStateToProps=state=>{
    return{
        products:state.product.products,
        loading:state.product.loading,
        productSelected:state.product.productSelected
     //   isSuccess:state.product.isSuccess,
    //    loadingAddEdit:state.product.loadingAddEdit
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchProducts:()=>dispatch(actions.Product_GetList()),
        onSelectedProduct:(product)=>dispatch(actions.Product_Selected(product)),
     //   onAddProductEnd:()=>dispatch(actions.Product_Add_End())
    }
}


const ProductAdminContainer= connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ProductAdminComponent,axios));
export default ProductAdminContainer;

