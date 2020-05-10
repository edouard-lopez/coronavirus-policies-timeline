import { Event, Events } from '../types/event'

export const event1: Event = {
  published_date: '2020-01-05T00:00:00+00:00',
  url:
    'https://www.who.int/csr/don/05-january-2020-pneumonia-of-unkown-cause-china/en/',
  title: 'Pneumonia of unknown cause – China',
  tags: ['announcement', 'first-case'],
  entity: 'government',
  region: 'World',
}

export const event2: Event = {
  published_date: '2020-03-13T08:00:17+08:00',
  url:
    'https://www.scmp.com/news/china/society/article/3074991/coronavirus-chinas-first-confirmed-covid-19-case-traced-back',
  title: "China's first confirmed Covid-19 case traced back to November 17",
  tags: ['virus'],
  entity: 'government',
  region: 'Europe',
}

export const events: Events = [event1, event2]
