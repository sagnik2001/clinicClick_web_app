import { useEffect, useState, useRef } from "react";
import { api_url } from "../../../Urls/Api";
import axios from "axios";
import { checkIfTokenIsExpired } from "../utils";
import { useDoctorInfo } from "../../../Context/DoctorInfoContext";

export const useFetchDoctorProfile = () => {
    const { handleRefreshToken } = useDoctorInfo();

    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const hasFetchedRef = useRef(false); // Ref to track if data has been fetched

    useEffect(() => {
        let token = localStorage.getItem("token"); // Move inside useEffect to ensure it gets the latest value

        if (!hasFetchedRef.current) { // Check if the fetch operation hasn't been done yet
            if (token && checkIfTokenIsExpired(token)) {
                handleRefreshToken();
                token = localStorage.getItem("token"); // Update token after refresh
            }

            const fetchUserInfo = async () => {
                setIsLoading(true);
                try {
                    const data = await axios.get(`${api_url}doc/getInfo/`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (data.status !== 200) {
                        throw new Error('Failed to fetch user info');
                    }
                    setUserInfo(data.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            };

            if (token) {
                fetchUserInfo();
                hasFetchedRef.current = true; // Mark as fetched
            }
        }
    }, []); // Dependency array left empty to ensure this effect runs only once on mount

    return { userInfo, isLoading, error };
};
