import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/reducer/changeRoleSlice';
import FadeIn from '../effect/FadeIn'
import './Login.css'
import { Form } from 'react-bootstrap';
import { handleLoginAPI } from '../../service/userService';
import { loginCondition, PATH, role, SCREEN_PATH } from '../../constant/constant';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    // event.preventDefault();
    setErrorMsg('');
    if(email && password){
      const data = await handleLoginAPI(email, password);
      // console.log(data);
      // console.log({email, password});
      if(data.loginCondition == loginCondition.EMAIL_NOT_EXIST){
        setErrorMsg("Email không tồn tại.");
      } else if(data.loginCondition == loginCondition.FAILED_PASSWORD){
        setErrorMsg("Mật khẩu không chính xác.");
      } else {
        dispatch(loginAction({roleId: data.roleId, email}));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', data.roleId);
        localStorage.setItem('email', email);
        localStorage.setItem('menuItemOrder', 0);
        navigate(PATH.HOME);
      }
    }else {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin đăng nhập.')
    }
  }

  const handleEnterKeyPress = (event)=>{
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  }

  return (
    <FadeIn>
      <div className="container root-div">
      <div className="row justify-content-center">
        <div className="col-6 main-frame shadow text-center pt-5">

          <span className="lead text-9xl ">ĐĂNG NHẬP</span>

          <Form className="container mt-5">
            <Form.Group className="row" controlId="email">
              <div className="col-3"><Form.Label >Email</Form.Label></div>
              <div className="col-9"><Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} /></div>
            </Form.Group>

            <Form.Group className="row mt-4" controlId="password">
              <div className="col-3"><Form.Label>Mật Khẩu</Form.Label></div>
              <div className="col-9">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={handlePasswordChange} 
                  onKeyPress={handleEnterKeyPress} />
              </div>
            </Form.Group>
            <div className='text-center mt-3 text-danger'>{errorMsg}</div>
            <div className="row mt-3 login btn btn-primary" onClick={handleLogin}>
              Đăng Nhập
            </div>
          </Form>
          {/* <div className='btn btn-primary' onClick={handleLogin}>abcsasd</div> */}

          <div className="mt-4 text-right text-xs"><a href="http://">Quên mật khẩu?</a></div>
        </div>
      </div>
    </div>
    </FadeIn>
  )
}
