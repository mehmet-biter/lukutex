import * as React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { selectAllChildCurrencies, selectCurrencies, Wallet } from '../../../../modules';
// import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { CurrencyInfo } from '../../components/CurrencyInfo';

const SelectStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#313F60' : '#3B4B72'
    }),
    control: (provided, state) => ({
        ...provided,
        border: 'none',
        color: '#fff',
        backgroundColor: "#3B4B72",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#fff',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        border: 'none',
        color: '#fff',
        backgroundColor: "#3B4B72",
    }),
    menu: (provided, state) => ({
        ...provided,
        border: 'none',
        color: '#fff',
        backgroundColor: "#3B4B72",
    }),
    input: (provided, state) => ({
        ...provided,
        color: '#fff',
    }),
}

// const WalletCardStyles = styled.div`
//     width: 300px;
//     height: 200px;
//     background: linear-gradient(135deg, #13f1fc 0%,#0470dc 100%);
//     border-radius: 30px;
//     backdrop-filter: blur(20px);
//     display: flex;
//     -webkit-box-pack: justify;
//     justify-content: space-between;
//     padding: 20px;
//     .left {
//         width: 85%;
//         padding-left: 1rem;
//     }
//     .right {
//         width: 15%;
//     }
//     h4 {
//         font-weight: bold;
//         font-size: 2rem;
//         color: #fff;
//         span {
//             font-size: 1.3rem;
//             color: #5F5F5F;
//         }
//     }
//     .wallet-balance {
//         position: absolute;
//         width: 100%;
//         height: 30%;
//         bottom: 0;
//         left: 0;
//         background-color: #036ED9;
//         border-bottom-left-radius: 30px;
//         border-bottom-right-radius: 30px;
//         padding: 1rem 2rem 0 2rem;
//         display: flex;
//         justify-content: space-between;
//         flex-direction: row;

//         .wallet-balance__available {
//             text-align: left;
//         }

//         .wallet-balance__locked {
//             align-self: flex-end;
//             text-align: right;
//             margin-bottom: 1rem;
//         }
//     }
// `;

interface DepositInfoProps {
    currency_id: string;
    currency_icon: string;
    wallets: Wallet[]
}

export const DepositInfo: React.FC<DepositInfoProps> = (props: DepositInfoProps) => {
    const { currency_id, wallets } = props;

    const intl = useIntl();
    const history = useHistory();

    // selectors
    const currencies = useSelector(selectCurrencies);
    const all_child_currencies = useSelector(selectAllChildCurrencies);

    const wallet = wallets.find(wallet => wallet.currency.toLowerCase() === currency_id.toLowerCase()) || { currency: "", name: "", type: "fiat", fee: 0, fixed: 0 };

    const currency = currencies.find((currency: any) => String(currency.id).toLowerCase() === currency_id.toLowerCase()) || { name: '', min_confirmations: 6, min_deposit_amount: 6, deposit_fee: 6, deposit_enabled: false };

    const textConfirmation = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.confirmation' }, { confirmations: currency.min_confirmations });

    const textMinDeposit = `${intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.mindeposit' })} ${Number(currency.min_deposit_amount) + Number(currency.deposit_fee)} ${currency_id.toUpperCase()}`;

    const textDepositFee = `${intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.depositfee' })} ${Number(currency.deposit_fee)} ${currency_id.toUpperCase()}`;

    const textNote = `Only Deposit ${currency_id.toUpperCase()} to this wallet.`

    // method
    const findIcon = (code: string): string => {
        const currency = currencies.find((currency: any) => currency.id === code);
        try {
            return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
        } catch (err) {
            if (currency) return currency.icon_url;
            return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };

    // Select
    const options = currencies.map(currency => {
        const newCurrency = {
            value: currency.id,
            label: <span><img style={{ width: '2rem' }} src={findIcon(currency.id)} alt={currency.id} /> {currency.name.toUpperCase()}</span>
        }
        return newCurrency;
    });

    const handleChange = (selectedOption: any) => {
        const currency_id = String(selectedOption.value);
        const location = {
            pathname: `/new-wallets/deposit/${currency_id.toUpperCase()}`
        }
        history.push(location);
    };
    console.log(all_child_currencies.payload);
    
    return (
        <div className="container" style={{ padding: '50px 0' }}>
            <div className="row">
                <div className="col-8 d-inline">
                    <span style={{ fontSize: '3rem', color: '#3c78e0' }}>Deposit/ </span>
                    <span className="text-secondary" style={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => history.push({ pathname: `/new-wallets/withdraw/${currency_id.toUpperCase()}` })}>Withdraw</span>
                </div>
                <div className="col-4">
                    <Select
                        styles={SelectStyles}
                        value={options.filter(option => option.value == currency_id.toLowerCase())}
                        onChange={handleChange}
                        options={options.filter((option) => !all_child_currencies.payload.map(cur => cur.id).includes(option.value))}
                    />
                </div>
            </div>
            <div className="row" style={{ marginTop: '50px' }}>
                <div className="col-12">
                    <CurrencyInfo wallet={wallet} />
                </div>
            </div>
            <div className="row mt-5" style={{ fontSize: '1.3rem' }}>
                <div className="col-6">
                    <div className="d-flex align-items-center">
                        <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.791a.723.723 0 00.716-.729V2.729c0-.402-.32-.729-.716-.729a.723.723 0 00-.716.73v1.332c0 .402.32.73.716.73zM6.884 6.51a.713.713 0 01-.716.72.733.733 0 01-.508-.2l-.936-.94a.713.713 0 01-.212-.515c0-.197.076-.385.212-.515a.734.734 0 011.016 0l.932.934c.136.13.212.319.212.516zm4.436 14.032h1.336c.396 0 .716.326.716.729 0 .402-.32.729-.716.729h-1.332a.723.723 0 01-.716-.73c0-.38.32-.707.712-.729zM2.716 10.268h1.332c.388 0 .716.335.716.73 0 .401-.32.728-.716.728H2.716A.723.723 0 012 10.998c0-.394.328-.73.716-.73zm16.776-4.694a.696.696 0 00-.212-.511.701.701 0 00-1.02 0l-.932.934a.713.713 0 00-.212.516c0 .197.076.386.212.515.14.135.324.202.508.202a.719.719 0 00.508-.206l.932-.934a.73.73 0 00.216-.516zm.46 4.694h1.332c.388 0 .716.335.716.73 0 .401-.32.728-.716.728h-1.332a.723.723 0 01-.716-.729c0-.402.32-.73.716-.73zm-5.964 8.294h-3.976a.723.723 0 00-.716.73c0 .402.32.729.716.729h3.976a.723.723 0 00.716-.73c0-.402-.32-.729-.716-.729zM12 5.981c1.612 0 3.124.625 4.26 1.76A5.984 5.984 0 0118.024 12c0 1.61-.628 3.122-1.764 4.258a5.982 5.982 0 01-4.26 1.76 5.982 5.982 0 01-4.26-1.76A5.984 5.984 0 015.976 12c0-1.61.628-3.123 1.764-4.258A5.982 5.982 0 0112 5.982z" fill="currentColor"></path>
                        </svg>
                        <span className="ml-2">Deposit Notice: </span>
                    </div>
                    <div className="ml-2 mt-2">
                        <p>1. If you have deposited, please pay attention to the text messages, site letters and emails we send to you.</p>
                        <p>2. Until 2 confirmations are made, an equivalent amount of your assets will be temporarily unavailable for withdrawals.</p>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex align-items-center">
                        <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.791a.723.723 0 00.716-.729V2.729c0-.402-.32-.729-.716-.729a.723.723 0 00-.716.73v1.332c0 .402.32.73.716.73zM6.884 6.51a.713.713 0 01-.716.72.733.733 0 01-.508-.2l-.936-.94a.713.713 0 01-.212-.515c0-.197.076-.385.212-.515a.734.734 0 011.016 0l.932.934c.136.13.212.319.212.516zm4.436 14.032h1.336c.396 0 .716.326.716.729 0 .402-.32.729-.716.729h-1.332a.723.723 0 01-.716-.73c0-.38.32-.707.712-.729zM2.716 10.268h1.332c.388 0 .716.335.716.73 0 .401-.32.728-.716.728H2.716A.723.723 0 012 10.998c0-.394.328-.73.716-.73zm16.776-4.694a.696.696 0 00-.212-.511.701.701 0 00-1.02 0l-.932.934a.713.713 0 00-.212.516c0 .197.076.386.212.515.14.135.324.202.508.202a.719.719 0 00.508-.206l.932-.934a.73.73 0 00.216-.516zm.46 4.694h1.332c.388 0 .716.335.716.73 0 .401-.32.728-.716.728h-1.332a.723.723 0 01-.716-.729c0-.402.32-.73.716-.73zm-5.964 8.294h-3.976a.723.723 0 00-.716.73c0 .402.32.729.716.729h3.976a.723.723 0 00.716-.73c0-.402-.32-.729-.716-.729zM12 5.981c1.612 0 3.124.625 4.26 1.76A5.984 5.984 0 0118.024 12c0 1.61-.628 3.122-1.764 4.258a5.982 5.982 0 01-4.26 1.76 5.982 5.982 0 01-4.26-1.76A5.984 5.984 0 015.976 12c0-1.61.628-3.123 1.764-4.258A5.982 5.982 0 0112 5.982z" fill="currentColor"></path>
                        </svg>
                        <span className="ml-2">Tips: </span>
                    </div>
                    <div className="ml-2 mt-2">
                        <p>{textConfirmation}</p>
                        <p>{textMinDeposit}</p>
                        <p>{textDepositFee}</p>
                        <p className="textnote">
                            <span className="textnote__textj">Note:</span>
                            <span> {textNote}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
