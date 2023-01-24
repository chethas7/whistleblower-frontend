import React, { useState } from 'react';
import Logo from '../../Image/12.jpg';
import { UilSearch } from '@iconscout/react-unicons';
import './LogoSearch.css';
import { SearchUsers } from '../../Api/userRequest';
import { Link } from 'react-router-dom';

const LogoSearch = () => {
  const [nameSearch, setNameSearch] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const envData = process.env.REACT_APP_PUBLIC_FOLDER
  const handleChange = (e) => {
    setNameSearch(e.target.value);
  };
  console.log(nameSearch, 'name search');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nameSearch,"user searcgh")
    const {data}= await SearchUsers(nameSearch);
    console.log(data)
    setResult(data);
    setShowResult(data)
  };
  console.log(result,"searching result printed here ");
  

  return (
    <div>


      <div className='logoSearch'>
        <img className='searchLogo' src={Logo} alt="logo" />
        <div className='searchDiv'>
        <form onSubmit={handleSubmit}>
          <div className="search">



            <input type="text"
              name='nameSearch'
              placeholder='#Find whats new'
              onChange={handleChange}
              value={nameSearch} />


            <div className='s-icon'>
              <button type='submit'><UilSearch /></button>
            </div>


          </div>
        </form>
        </div>


      </div>

      
      {showResult&&
       <div className='searchResults'>
      {result.map((users) => {
        return (
          <Link to = {`/profile/${users._id}` } className = "profilelink" style={{textDecoration:"none", color:"black"}} >
            <div className='singleResult'  key={users._id}>
              <img src={users.profilePicture ? envData + users.profilePicture : envData + "profile.png"} alt=""
                className='resultProfilePictur' />
              <span>{users.firstname} {users.lastname}</span>
              
            </div>
            </Link>
           

          
        )

      })
      }
      </div>}
    </div>
  )
}

export default LogoSearch