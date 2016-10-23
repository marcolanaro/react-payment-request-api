/// <reference types="react" />
import { StatelessComponent } from "react";
export declare type supportedMethod = "amex" | "diners" | "discover" | "jcb" | "maestro" | "mastercard" | "unionpay" | "visa";
export declare type supportedMethods = supportedMethod[];
export interface Amount {
    currency: Currency;
    value: string;
}
export interface Item {
    label: string;
    amount: Amount;
}
export interface ShippingOption {
    id: string;
    label: string;
    amount: Amount;
    selected?: boolean;
}
export declare type Resolve = (value?: {} | PromiseLike<{}>) => void;
export declare type Reject = (reason?: any) => void;
export declare type Callback = (request: any, resolve: Resolve, reject: Reject) => void;
export declare type MethodData = [{
    supportedMethods: supportedMethods;
}];
export interface Details {
    total: Item;
    displayItems: Item[];
    shippingOptions?: ShippingOption[];
}
export interface Options {
    requestShipping?: boolean;
    requestPayerEmail?: boolean;
    requestPayerPhone?: boolean;
}
export interface PaymentRequestParams {
    methodData: MethodData;
    details: Details;
    options?: Options;
    onShowSuccess: (paymentResponse: any, resolve: Resolve, reject: Reject) => void;
    onShowFail: (err: any) => void;
    onShippingAddressChange?: Callback;
    onShippingOptionChange?: Callback;
}
export interface PaymentRequestInterface {
    isSupported: boolean;
    show: () => void;
    abort: () => void;
}
export declare type PaymentRequestEnancher = (params: PaymentRequestParams) => (WrappedComponent: StatelessComponent<any>) => any;
declare const paymentRequest: PaymentRequestEnancher;
export default paymentRequest;
export declare type Currency = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BZD" | "CAD" | "CDF" | "CHF" | "CLP" | "CNY" | "COP" | "CRC" | "CUC" | "CUP" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GGP" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "IMP" | "INR" | "IQD" | "IRR" | "ISK" | "JEP" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KMF" | "KPW" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRO" | "MUR" | "MVR" | "MWK" | "MXN" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SPL" | "SRD" | "STD" | "SVC" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TVD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "UYU" | "UZS" | "VEF" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XDR" | "XOF" | "XPF" | "YER" | "ZAR" | "ZMW" | "ZWD";
