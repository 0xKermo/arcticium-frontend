import React from 'react';

//react functional component
const UserTopSeller = ({ user }) => {
    return user ? (
        <>
            <div className="author_list_pp">
              <span onClick={()=> window.open("", "_self")}>
                  <img className="lazy" src={user.avatar} alt=""/>
                  <i className="fa fa-check"></i>
              </span>
            </div>                                    
            <div className="author_list_info">
                <span onClick={()=> window.open("", "_self")}>{user.username}</span>
                <span className="bot">{user.author_sale} ETH</span>
            </div>   
        </>     
    ) : <></>;
};

export default UserTopSeller;