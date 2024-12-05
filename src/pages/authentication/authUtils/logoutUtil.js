import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../../redux/actions/signInActions';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('uniqueId');

        dispatch(logoutAction());

        navigate('/login');
    };

    return logout;
};