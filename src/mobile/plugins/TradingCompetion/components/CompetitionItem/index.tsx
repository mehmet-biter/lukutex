import * as React from 'react';
import { useHistory } from 'react-router';
import './CompetitionItem.css';
// import Countdown from 'react-countdown';
import { Competition, currenciesFetch } from '../../../../../modules';
import { useDispatch } from 'react-redux';

import GiftBoxImage from '../../assets/4th-v2.png';
import { Button } from 'antd';

interface CompetitionItemProps {
    competition: Competition;
    type: 'ongoing' | 'upcoming' | 'ended';
}

export const CompetitionItem: React.FC<CompetitionItemProps> = (props: CompetitionItemProps) => {

    const { id, currency_id, total_prize } = props.competition;
    const { type } = props;

    const history = useHistory();

    const dispatch = useDispatch();
    const dispatchcFetchCurrencies = () => dispatch(currenciesFetch());

    React.useEffect(() => {
        dispatchcFetchCurrencies();
    }, []);

    const handleDetailClick = () => {
        const location = {
            pathname: '/trading-competition/' + id
        }
        history.push(location);
    }

    let competitionTitleColor: string = '#0C9D58ff';
    switch (type) {
        case 'ongoing':
            competitionTitleColor = '#0C9D58ff';
            break;
        case 'upcoming':
            competitionTitleColor = '#FABE08ff';
            break;
        case 'ended':
            competitionTitleColor = '#EA4235ff';
            break;
        default:
            break;
    }

    return (
        <div className="competition-item-mobile">
            <div className="row competition-item-mobile__top" >
                <div className="col-6">
                    <img style={{ width: '30px', height: '30px' }} src="https://coinsbit.io/storage/currency/sVmRDPgDdWX6P6NVqjzIswtr3w4XQdahRwVTrvbr.png" alt="currency" />
                    <span style={{ padding: '0.5rem 1rem', color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>{currency_id.toUpperCase()}</span>
                </div>
                <div className="col-6" style={{ textAlign: 'end' }}>
                    <span style={{ backgroundColor: competitionTitleColor }} className="competition-item-mobile__badge">{type.toUpperCase()}</span>
                </div>
            </div>
            <div className="row competition-item-mobile__middle mt-3">
                <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                    <img style={{ width: '60px', height: '60px', textAlign: 'center' }} src={GiftBoxImage} alt="gift-box" />
                    <br />
                    <h4>{total_prize.toUpperCase()}</h4>
                    <h5>Best prize</h5>
                </div>
            </div>
            <hr />
            <div className="row competition-item-mobile__bottom mt-3">

                <div className="col-12 text-center">
                    <Button block type="primary" disabled={type !== 'ongoing'} onClick={handleDetailClick}>Start</Button>
                </div>
            </div>
        </div>
    );
};