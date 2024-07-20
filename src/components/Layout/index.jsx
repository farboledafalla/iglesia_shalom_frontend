import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
   return (
      <div className='flex flex-col mt-24 items-center pl-6 pr-6 mb-8'>
         {children}
      </div>
   );
};

Layout.propTypes = {
   children: PropTypes.array,
};
