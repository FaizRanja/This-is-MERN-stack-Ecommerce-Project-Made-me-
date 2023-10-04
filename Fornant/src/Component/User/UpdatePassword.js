import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ClearError, updatePassword } from "../../redux/actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/Header/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { UPDATE_PASSWORD_RESET } from "../../redux/constant/UserConstant";
import { useNavigate } from "react-router-dom";
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate()

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

    // Handle 

    const togglePasswordVisibility = () => {
      setVisible(!visible);
    };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

     navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                        <div className="loginPassword ">
      <input
        type={visible ? 'text' : 'password'}
        placeholder="Password"
        required
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      {visible ? (
        <VpnKeyOffIcon
          className="absolute"
          size={25}
          onClick={togglePasswordVisibility}
        />
      ) : (
        <VpnKeyIcon
          className="absolute"
          size={25}
          onClick={togglePasswordVisibility}
        />
      )}
    </div>

    <div className="loginPassword ">
      <input
        type={visible ? 'text' : 'password'}
        placeholder="Password"
        required
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {visible ? (
        <LockOpenIcon
          className="absolute"
          size={25}
          onClick={togglePasswordVisibility}
        />
      ) : (
        <LockIcon
          className="absolute"
          size={25}
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
    <div className="loginPassword ">
      <input
        type={visible ? 'text' : 'password'}
        placeholder="Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {visible ? (
        <LockOpenIcon
          className="absolute"
          size={25}
          onClick={togglePasswordVisibility}
        />
      ) : (
        <LockIcon
          className="absolute"
          size={25}
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;