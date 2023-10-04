import React,{Fragment,useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid'
import {useDispatch,useSelector} from 'react-redux'
import {ClearError,getAdminProduct,deleteProduct} from "../../redux/actions/productAction"
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../Layout/Header/MetaData'
  import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import "./AdminProducts.css"
import { DELETE_PRODUCT_RESET } from '../../redux/constant/ProductConstant'


const AdminProducts = () => {

  const dispatch=useDispatch()
  const alert =useAlert()
  const navigate=useNavigate()

  const {error,products}=useSelector((state)=>state.products)

  const {error:deleteerror,isDeleted}=useSelector((state)=>state.DeleteProducts)

  const deleteproductshandler=(id)=>{
dispatch(deleteProduct(id))
  }

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(ClearError())
    }
    if(deleteerror){
      alert.error(deleteerror)
      dispatch(ClearError())
    }

    if(isDeleted){
      alert.success("Product Deleted Successfully")
      navigate("/admin/dashboard")
      dispatch({type:DELETE_PRODUCT_RESET})
    }
    dispatch(getAdminProduct())
  },[dispatch,error,alert ,isDeleted,navigate,deleteerror])

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 120,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
onClick={()=>deleteproductshandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });



  return (
 <Fragment>
     <MetaData title={`ALL PRODUCTS - Admin`} />

<div className="dashboard">
  <Sidebar/>
  <div className="productListContainer">
    <h1 id="productListHeading">ALL PRODUCTS</h1>

    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
  </div>
</div>
 </Fragment>
  )
}

export default AdminProducts
