import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';

const ViewEnquiryCell = ({ EnquiryID }) => {
  const { markAsViewed } = useStateContext();

  return (
    <Link
      to={`/enquiries/${EnquiryID}`}
      onClick={() => markAsViewed(EnquiryID)}
    >
      <AiOutlineEye />
    </Link>
  );
};

export default ViewEnquiryCell;
