import React from 'react';
import { Link } from 'react-router-dom';

const Initial = () => {
    return (
        <div className='text-center'>
            <h1 className='text-center mb-4 font-bold'> Welcome to the admin dashboard model App. <br /> Due to short i can't complete all. </h1>

            <div>
              <Link to='/admin/login'>  <button className='btn btn-lg bg-blue-500 p-4 rounded-lg text-white'>login</button></Link>
              <Link to='/admin/video'>  <button className='btn btn-lg bg-blue-500 p-4 rounded-lg text-white'>Video Paginate</button></Link>


            </div>
        </div>
    );
};

export default Initial;