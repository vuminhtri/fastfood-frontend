import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import { setHeaders, url } from "../../slices/api";
import Widget from "../../components/admin/summary/Widget";
import Chart from "../../components/admin/summary/Chart";
import Transactions from "../../components/admin/summary/Transactions";
import AllTimeData from "../../components/admin/summary/AllTimeData";

const Summary = () => {
    const [userNum, setUserNum] = useState([]);
    const [userNumPerc, setUserNumPerc] = useState(0);
    const [orderNum, setOrderNum] = useState([]);
    const [orderNumPerc, setOrderNumPerc] = useState(0);
    const [income, setIncome] = useState([]);
    const [incomePerc, setIncomePerc] = useState(0);

    function compare(a, b) {
        return a._id < b._id ? 1 : a._id > b._id ? -1 : 0;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${url}/users/stats`, setHeaders());
                res.data.sort(compare);
                setUserNum(res.data);
                setUserNumPerc(
                    ((res.data[0].total - res.data[1].total) /
                        res.data[1].total) *
                        100
                );
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    `${url}/orders/stats`,
                    setHeaders()
                );
                res.data.sort(compare);
                setOrderNum(res.data);
                setOrderNumPerc(
                    ((res.data[0].total - res.data[1].total) /
                        res.data[1].total) *
                        100
                );
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    `${url}/orders/income/stats`,
                    setHeaders()
                );
                res.data.sort(compare);
                console.log(res.data)
                setIncome(res.data);
                setIncomePerc(
                    ((res.data[0].total - res.data[1].total) /
                        res.data[1].total) *
                        100
                );
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const data = [
        {
            icon: <FaUsers />,
            digits: userNum[0]?.total,
            isMoney: false,
            title: "Users",
            color: "rgb(102, 108, 255)",
            bgColor: "rgba(102, 108, 255, 0.12)",
            percentage: userNumPerc,
        },
        {
            icon: <FaClipboard />,
            digits: orderNum[0]?.total,
            isMoney: false,
            title: "Orders",
            color: "rgb(38, 198, 249)",
            bgColor: "rgba(38, 198, 249, 0.12)",
            percentage: orderNumPerc,
        },
        {
            icon: <FaChartBar />,
            digits: income[0]?.total ? income[0]?.total : "",
            isMoney: true,
            title: "Earnings",
            color: "rgb(253, 181, 40)",
            bgColor: "rgba(253, 181, 40, 0.12)",
            percentage: incomePerc,
        },
    ];
    return (
        <StyledSummary>
            <MainStats>
                <Overview>
                    <Title>
                        <h2>Overview</h2>
                        <p>
                            How your shop is performing compared to the previous
                            month
                        </p>
                    </Title>
                    <WidgetWrapper>
                        {data?.map((data, index) => (
                            <Widget key={index} data={data} />
                        ))}
                    </WidgetWrapper>
                </Overview>
                <Chart />
            </MainStats>
            <SideStats>
                <Transactions />
                <AllTimeData />
            </SideStats>
        </StyledSummary>
    );
};

export default Summary;

const StyledSummary = styled.div`
    width: 100%;
    display: flex;
`;

const MainStats = styled.div`
    flex: 2;
    width: 100%;
`;

const Title = styled.div`
    p {
        font-size: 14px;
        color: rgba(234, 234, 255, 0.68);
    }
`;

const Overview = styled.div`
    background: rgb(48, 51, 78);
    color: rgba(234, 234, 255, 0.87);
    width: 100%;
    padding: 1.5rem;
    height: 170px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const WidgetWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const SideStats = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    width: 100%;
`;
