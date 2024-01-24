import { Link } from "react-router-dom";

function MenuAcc(){
    return(
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h4>ACCOUNT</h4>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <Link to="/account/update" data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                          <span className="badge pull-right"><i className="fa fa-plus" /></span>
                          ACCOUNT
                        </Link>
                      </h4>
                    </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <Link to="/account/product" data-toggle="collapse" data-parent="#accordian" href="#mens">
                          <span className="badge pull-right"><i className="fa fa-plus" /></span>
                          MY PRODUCT
                        </Link>
                      </h4>
                    </div>
                  </div>
            </div>{/*/category-products*/}
               
                </div>  
            </div>
        </div>

    )
}
export default MenuAcc;