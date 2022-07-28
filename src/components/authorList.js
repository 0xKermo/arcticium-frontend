import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserTopSeller from './userTopSeller';
import { dummyData } from "./constants/dummy";

const AuthorList = () => {
    return (
        <div>
            <ol className="author_list">
            { dummyData && dummyData.map((author, index) => (
                <li key={index}>
                    <UserTopSeller user={author} />
                </li>
            ))}
            </ol>
        </div>
    );
};
export default AuthorList;