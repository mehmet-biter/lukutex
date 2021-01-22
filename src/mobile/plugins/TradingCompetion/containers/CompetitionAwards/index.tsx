import * as React from 'react';

import './CompetitionAwards.css';
import TopOneImage from '../../assets/1st-v2.png';
import TopTwoImage from '../../assets/2nd-v2.png';
import TopThreeImage from '../../assets/3rd-v2.png';
import TopFourImage from '../../assets/4th-v2.png';

// import IndividualImage from '../../assets/individual-v2.png';
import IndividualLeftImage from '../../assets/individual-left-aurora-v2.png';
import IndividualRightImage from '../../assets/individual-right-aurora-v2.png';

export const CompetitionAwards = () => {
    const awards = [
        {
            rank: 'Top 1',
            prize: 'of the total prize pool',
            percent: '8%'
        },
        {
            rank: 'Top 2',
            prize: 'of the total prize pool',
            percent: '5%'
        },
        {
            rank: 'Top 3',
            prize: 'of the total prize pool',
            percent: '2%'
        },
        {
            rank: 'Top 4-10',
            prize: 'of the total prize pool',
            percent: '1%'
        }
    ];

    const awardImages = [TopOneImage, TopTwoImage, TopThreeImage, TopFourImage];

    const awardList = awards.map((award, index) => (
        <div className="col-12 text-center competition-award-mobile-item">
            <img style={{ width: '100px', height: '100px' }} src={awardImages[index]} alt="award-item" />
            <h2 className="text-center" style={{ marginTop: '1rem', paddingBottom: '1rem', fontWeight: 'bold', fontSize: '1rem' }}>{award.rank}</h2>
            <div className="text-center">
                <h3 style={{ color: '#333', fontSize: '1rem' }}>{award.percent}</h3>
                <h4 style={{ color: '#333', fontSize: '1rem' }}>{award.prize}</h4>
            </div>
        </div>
    ))
    return (
        <div id="competition-award-mobiles" className="container-fluid">
            <div className="row">
                <div className="col-12 text-center">
                    <img style={{ width: '100px' }} src={TopFourImage} alt="award_image" />
                </div>
            </div>
            <div className="row" style={{marginTop: '20px'}}>
                <div className="col-12 d-flex align-items-center justify-content-end">
                    <img style={{width: '200px', height: '8px'}} src={IndividualLeftImage} alt="left-line" />
                </div>
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <h3 style={{fontSize: '3rem'}}>Awards</h3>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-start">
                    <img style={{width: '222px', height: '8px'}} src={IndividualRightImage} alt="right-line" />
                </div>
            </div>
            <div className="row" style={{marginTop: '50px'}}>
                {awardList}
            </div>
        </div>
    )
}
