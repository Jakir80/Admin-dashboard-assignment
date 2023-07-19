import React from 'react';
import { Link } from 'react-router-dom';

const Initial = () => {
    return (
        <div className='text-center'>
             Welcome to the admin dashboard model App

            <div>
              <Link to='/admin/login'>  <button className='btn btn-lg bg-blue-500 p-4 rounded-lg text-white'>login</button></Link>
            </div>
        </div>
    );
};

export default Initial;