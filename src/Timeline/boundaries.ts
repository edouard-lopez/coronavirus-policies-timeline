import { DateTime } from "luxon";

const FIRST_CASE = DateTime.fromISO("2019-11-17T00:00:00+00:00").toSeconds(); // 17 November 2019 https://www.theguardian.com/world/2020/mar/13/first-covid-19-case-happened-in-november-china-government-records-show-report
const END_OF_2020 = DateTime.fromISO("2020-12-31T23:59:59+00:00").toSeconds();

export {
    FIRST_CASE,
    END_OF_2020
}