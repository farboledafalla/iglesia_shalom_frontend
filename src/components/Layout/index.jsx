import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
   return <div className='flex flex-col mt-20 items-center'>{children}</div>;
};

Layout.propTypes = {
   children: PropTypes.array,
};
