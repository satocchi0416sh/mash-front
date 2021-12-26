import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react"
import api from "./component/items/api"
import './App.css';
import Login from './component/pages/signup/Login';
import SignUp from "./component/pages/signup/signup"
import Top from './component/pages/top/Top';
import CardInfo from './component/pages/top/CardInfo';
import Header from './component/ui/header';
import Profile from './component/pages/profile/Profile';
import Favorite from './component/pages/cart/Favorite';
import Cart from './component/pages/cart/Cart';
import Payment from './component/pages/payment/Payment';
import Inquiry from './component/pages/inquiry/Inquiry';
import Order from './component/pages/cart/Order';
import Notice from './component/pages/notice/Notice';
import Search from './component/pages/top/Search';
import TopA from './component/admin/Top';
import Add from './component/admin/Add';
import Series from './component/admin/Series';
import CardSetting from './component/admin/CardSetting';
import InquiryA from './component/admin/Inquiry';
import Send from './component/admin/Send';


function App() {
  const [id, setId] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartNumber, setCartNumber] = useState(0)
  const [likeNumber, setLikeNumber] = useState(0)
  const [noticeNumber, setNoticeNumber] = useState(0)
  const [cload, setCload] = useState(false)
  const [lload, setLload] = useState(false)
  const [nload, setNload] = useState(false)

  useEffect(()=>{
    api.get("auth",{withCredentials:true}).then((response)=>{
      console.log(response.data)
      if(response.data.auth){
        setId(response.data.id)
        setIsLoggedIn(true)
      }
    })
  },[])

  useEffect(() => {
    api.get(`getNoticeNum/${id}`).then((response) => {
      setNoticeNumber(response.data.num)
      console.log(response.data.num)
    })
  },[id, nload])

  useEffect(() => {
    api.get(`getItems/${id}`).then((response) => {
      setCartNumber(response.data.length)
    })
  },[id, cload])
  
  useEffect(() => {
    api.get(`getLikes/${id}`).then((response) => {
      setLikeNumber(response.data.length)
    })
  },[id, lload])

  const loadingC = () => {
    setCload(!cload)
  }

  const loadingL = () => {
    setLload(!lload)
  }

  const loadingN = () => {
    setNload(!nload)
  }
  

  const login=(id)=>{
    setId(id)
    setIsLoggedIn(true)
  }

  const logout=()=>{
    setIsLoggedIn(false)
    setId(null)
    api.post("logout",{withCredentials:true}).then((response)=>{
      console.log(response.data)
    })
  }

  return (
    <div className="App">

      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} id={id} logout={logout} cartNumber={cartNumber} likeNumber={likeNumber} noticeNumber={noticeNumber}/>
        <Switch>
          <Route exact path="/">
            <Top id={id}/>
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/cardInfo/:cardId">
            <CardInfo id={id} loadingC={loadingC} loadingL={loadingL}/>
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/login">
            <Login login={login} />
          </Route>

          <Route path="/profile/:userId">
            <Profile id={id} />
          </Route>

          <Route path="/favorite/:userId">
            <Favorite id={id} loadingL={loadingL}/>
          </Route>

          <Route path="/cart/:userId">
            <Cart id={id} loadingC={loadingC}/>
          </Route>

          <Route path="/order/:userId">
            <Order id={id} />
          </Route>

          <Route path="/payment/:userId">
            <Payment id={id} loadingC={loadingC}/>
          </Route>

          <Route path="/inquiry">
            <Inquiry id={id} />
          </Route>

          <Route path="/notice/:id">
            <Notice id={id} loadingN={loadingN}/>
          </Route>

          <Route
          path="/admin"
          render={({match: { url }})=>(
            <>
              <Switch>
                <Route exact path={`${url}`}>
                  <TopA />
                </Route>
                <Route path={`${url}/add`}>
                  <Add />
                </Route>
                <Route path={`${url}/series`}>
                  <Series />
                </Route>
                <Route path={`${url}/setting`}>
                  <CardSetting />
                </Route>
                <Route path={`${url}/inquiry`}>
                  <InquiryA />
                </Route>
                <Route path={`${url}/send/:userId/:inquiryId`}>
                  <Send />
                </Route>
              </Switch>
            </>
          )}
          />
            
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App