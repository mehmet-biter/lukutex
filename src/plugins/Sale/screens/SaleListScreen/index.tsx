import * as React from 'react';
import { Button } from 'antd';
import { SaleListTables } from '../../containers';
import './SaleListScreen.css';
export const SaleListScreen: React.FC = () => {
    return (
        <React.Fragment>
            <div style={{ position: 'relative', padding: '0 5%' }}>
                <img
                    style={{ width: '100%', margin: 0 }}
                    src="https://i.imgur.com/BVEzar1.png" alt="ieo_banner" />
                <div style={{ position: 'absolute', content: '', bottom: '-3rem', left: '50%', transform: 'translate(-50%, -50%)', display: 'inline-block' }}>
                    <Button
                        style={{ backgroundColor: '#457b9d' }}
                        type="primary" 
                        size={'large'}
                        href="link can dien"
                        target="_blank">
                       Download
                    </Button>
                    <Button
                        href="link can dien"
                        target="_blank"
                        style={{ backgroundColor: '#2a9d8f' }}
                        type="primary"
                        size={'large'}>
                        Download
                    </Button>
                </div>
            </div>

            <div id="sale-list" className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="sale-list__title">Welcome to Lukutex Launchpad!</h1>
                        <h2 className="sale-list__subtitle">The starting point for the most promising projects the cryptocurrency space has to offer.</h2>
                    </div>
                </div>
                <div className="mt-3">
                    <SaleListTables />
                </div>
            </div>
        </React.Fragment>
    )
}
