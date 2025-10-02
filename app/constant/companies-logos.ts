import sevenEleven from "~/assets/logos/canadian-companies/7-eleven.jpeg";
import bmr from "~/assets/logos/canadian-companies/bmr.jpeg";
import brunet from "~/assets/logos/canadian-companies/brunet.jpeg";
import canac from "~/assets/logos/canadian-companies/canac.jpeg";
import canadianTire from "~/assets/logos/canadian-companies/canadian-tire.jpeg";
import costco from "~/assets/logos/canadian-companies/costco.jpeg";
import coucheTard from "~/assets/logos/canadian-companies/couche-tard.jpeg";
import filgo from "~/assets/logos/canadian-companies/filgo.jpeg";
import giantTiger from "~/assets/logos/canadian-companies/giant-tiger.jpeg";
import harnoisEnergies from "~/assets/logos/canadian-companies/harnois-energies.jpeg";
import iga from "~/assets/logos/canadian-companies/iga.jpeg";
import jeanCoutu from "~/assets/logos/canadian-companies/jean-coutu.jpeg";
import materiaxAudet from "~/assets/logos/canadian-companies/materiax-audet.jpeg";
import maxi from "~/assets/logos/canadian-companies/maxi.jpeg";
import mpMaterials from "~/assets/logos/canadian-companies/mp-materials.jpeg";
import patrickMorin from "~/assets/logos/canadian-companies/patrick-morin.jpeg";
import phramaprix from "~/assets/logos/canadian-companies/phramaprix.jpeg";
import renoDepot from "~/assets/logos/canadian-companies/reno-depot.jpeg";
import rona from "~/assets/logos/canadian-companies/rona.jpeg";
import superC from "~/assets/logos/canadian-companies/super-c.jpeg";
import walmart from "~/assets/logos/canadian-companies/walmart.jpeg";
import bestBuy from "~/assets/logos/usa-companies/best-buy.jpeg";
import cvs from "~/assets/logos/usa-companies/cvs.jpeg";
import hMart from "~/assets/logos/usa-companies/h-mart.jpeg";
import kroger from "~/assets/logos/usa-companies/kroger.jpeg";
import mitsuwa from "~/assets/logos/usa-companies/mitsuwa.jpeg";
import ranchMarket from "~/assets/logos/usa-companies/ranch-market.jpeg";
import riteAid from "~/assets/logos/usa-companies/rite-aid.jpeg";
import walgreens from "~/assets/logos/usa-companies/walgreens.jpeg";

import type { CountryCompanies } from '~/models/company';

const LOGOS: CountryCompanies[] = [
    {
        canada: [
            [
                { name: "7-eleven", src: sevenEleven },
                { name: "bmr", src: bmr },
                { name: "brunet", src: brunet },
                { name: "canac", src: canac },
                { name: "canadian-tire", src: canadianTire },
                { name: "costco", src: costco },
                { name: "couche-tard", src: coucheTard },
                { name: "filgo", src: filgo },
                { name: "giant-tiger", src: giantTiger },
                { name: "harnois-energies", src: harnoisEnergies },
                { name: "iga", src: iga },
                { name: "jean-coutu", src: jeanCoutu },
                { name: "materiax-audet", src: materiaxAudet },
                { name: "maxi", src: maxi },
                { name: "mp-materials", src: mpMaterials },
                { name: "patrick-morin", src: patrickMorin },
                { name: "pharmaprix", src: phramaprix },
                { name: "reno-depot", src: renoDepot },
                { name: "rona", src: rona },
                { name: "super-c", src: superC },
                { name: "walmart", src: walmart }
            ],
            [
                { name: "7-eleven", src: sevenEleven },
                { name: "bmr", src: bmr },
                { name: "brunet", src: brunet },
                { name: "canac", src: canac },
                { name: "canadian-tire", src: canadianTire },
                { name: "costco", src: costco },
                { name: "couche-tard", src: coucheTard },
                { name: "filgo", src: filgo },
                { name: "giant-tiger", src: giantTiger },
                { name: "harnois-energies", src: harnoisEnergies },
                { name: "iga", src: iga },
                { name: "jean-coutu", src: jeanCoutu },
                { name: "materiax-audet", src: materiaxAudet },
                { name: "maxi", src: maxi },
                { name: "mp-materials", src: mpMaterials },
                { name: "patrick-morin", src: patrickMorin },
                { name: "pharmaprix", src: phramaprix },
                { name: "reno-depot", src: renoDepot },
                { name: "rona", src: rona },
                { name: "super-c", src: superC },
                { name: "walmart", src: walmart }
            ]
        ]
    },
    {
        usa: [
            [
                { name: "best-buy", src: bestBuy },
                { name: "cvs", src: cvs },
                { name: "h-mart", src: hMart },
                { name: "kroger", src: kroger },
                { name: "mitsuwa", src: mitsuwa },
                { name: "ranch-market", src: ranchMarket },
                { name: "rite-aid", src: riteAid },
                { name: "walgreens", src: walgreens },
            ],
            [
                { name: "best-buy", src: bestBuy },
                { name: "cvs", src: cvs },
                { name: "h-mart", src: hMart },
                { name: "kroger", src: kroger },
                { name: "mitsuwa", src: mitsuwa },
                { name: "ranch-market", src: ranchMarket },
                { name: "rite-aid", src: riteAid },
                { name: "walgreens", src: walgreens },
            ],
        ]
    },
    {
        china: []
    },
    {
        australia:[ ]
    },
    {
        zealand: []
    },
    {
        cambodia: []
    },
    {
        japan: []
    }
]

export default LOGOS;
