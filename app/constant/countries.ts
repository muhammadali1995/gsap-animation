import type { Country } from "~/models/country";

export const countries: Country[] = [
  {
    id: "china",
    name: "CHINA 中国",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png",
    description:
      "China, officially the People's Republic of China, is a country in East Asia. It is the world's most populous country with a population exceeding 1.4 billion.",
    founded: "1949",
    industry: "Government",
    employees: "1.4 billion+",
    revenue: "$17.7 trillion GDP",
    headquarters: "Beijing, China",
    details: {
      companies: [{ name: "Sam's Club" }, { name: "Aldi" }, { name: "Costco" }],
    },
  },
  {
    id: "usa",
    name: "United States 美国",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    description: `
      <article>
          <h1>美国作为全球最成熟的线下零售市场，以其庞大的体量与强劲的消费力持续引领全球零售格局。</h1>
          
          <p>尽管电商渗透率已攀升至22.7%的历史高位，实体零售仍展现出强大的生命力——预计到2028年，线下渠道将贡献美国零售总额的72%。这一数据印证了实体店凭借其商品即得性、沉浸式体验和专业服务优势，在未来数年内仍将是零售生态的核心支柱。</p>
          
          <p>当前美国零售市场呈现出高度多元化的渠道格局，从大众平价零售到高端专业卖场，各渠道凭借精准定位与差异化策略占据独特生态位。对于计划进入美国市场的品牌而言，深入理解各渠道特性、销售数据及消费者趋势，是制定有效市场进入策略的基石。</p>
          
          <h2>一、多元渠道格局与核心运营数据</h2>
          
          <p>大众综合零售领域，Walmart（沃尔玛）作为全球最大零售商，以“每日低价”策略覆盖全美超4,700家门店。2025财年总营收达6,810亿美元，其中电商销售额同比增长20.8%，印证其通过“Walmart+”会员服务强化的全渠道战略成效。其主要客群聚焦中低收入家庭，依托无与伦比的供应链效率维持竞争优势。</p>
          
          <p>与之形成差异化竞争的是Target（塔吉特），其精准定位中产客群，通过设计师联名商品与“Good & Gather”等自有品牌提升溢价能力。该品牌的“Drive Up”线下取货服务成为全渠道增长引擎，2023年数字销售额占比已超15%，展示了体验式零售的强大潜力。</p>
          
          <p>会员制仓储与专业零售赛道中，Costco（好市多）凭借独特的会员制与极致性价比模式持续增长。2025财年第三季度净销售额达619.6亿美元，可比销售额增长8.0%，电商销售也保持14.8%的稳健增长，彰显其会员模式的高粘性。而在专业零售领域，Best Buy（百思买）通过“Geek Squad”专业顾问服务构建竞争壁垒，在智能家居与健康科技品类开辟增长第二曲线。</p>
          
          <p>食品生鲜与细分市场方面，Kroger（克罗格）凭借“Simple Truth”等自有品牌线与数据驱动营销，稳坐传统超市龙头地位。其近2,800家门店中，生鲜品类贡献约55%收入，凸显品类专注的优势。而被亚马逊收购后的Whole Foods（全食超市）则坚守高端有机定位，不过正面临来自Mitsuwa Marketplace等区域性特色零售商在特定文化消费领域的挑战。</p>
          
          <h2>二、核心市场趋势与品牌战略启示</h2>
          
          <p>全渠道融合已成为零售标配。零售商大数据分析市场预计至2032年达986.6亿美元，年复合增长率11.41%。品牌方需积极优化线上产品展示（包括高清图片与精准搜索关键词），并无缝适配BOPIS（线上购买店内取货）等混合购物模式。</p>
          
          <p>健康与可持续性正成为增长关键驱动力。绿色食品包装市场预计将从2024年的3.73亿美元增长至2032年的7.99亿美元。品牌方可通过可降解包装、成分透明化与环保供应链建设，在激烈竞争中建立差异化优势。</p>
          
          <p>自有品牌崛起重构竞争格局。Kroger、Target等零售商持续扩大自有品牌占比以提升毛利。面对这一趋势，品牌方需强化核心技术壁垒，或考虑与零售商建立OEM合作，同时注重品牌故事叙述与性价比的平衡。</p>
          
          <p>区域与细分市场蕴含巨大潜力。如ACE Hardware通过深度社区服务与专业建议牢牢把握DIY客群，这提示品牌方在特定品类市场需加强店员培训与场景化营销，以精准触达目标消费群体。</p>
          
          <p>美国零售生态正经历深刻变革，线下渠道在保持主体地位的同时，积极拥抱数字化与体验升级。对品牌方面言，成功的关键在于精准把握各渠道特性，结合消费趋势动态调整产品策略与资源配置，在这一全球最发达的零售市场中找到自身的增长路径。</p>
      </article>
    `,
    founded: "1776",
    industry: "Government",
    employees: "331 million+",
    revenue: "$25.4 trillion GDP",
    headquarters: "Washington D.C., USA",
    details: {
      companies: [
        { name: "Best Buy" },
        { name: "CVS" },
        { name: "H Mart" },
        { name: "Kroger" },
        { name: "Mitsuwa" },
        { name: "Ranch Market" },
        { name: "Rite Aid" },
        { name: "Walgreens" },
      ],
    },
  },
  {
    id: "canada",
    name: "Canada 加拿大",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
    description: `
    <article>
      <h1>加拿大零售市场格局多元且成熟，形成 - 实体为王与全渠道融合的韧性生态。</h1>
      
      <p>在“实体店为王”的北美商业土壤中，线下销售占比90%以上的超庞大市场份额。既有国际零售巨头占据重要地位，也有众多本土连锁品牌深耕细分领域。超过70%的商超开通“线上下单+到店自提”（BOPIS）, 这不仅是便利，更是驱动交叉销售的成熟多元生态体系。尽管年轻群体是线上渗透的主力，但85%的中老年消费者（55岁以上）购物任发生在实体店。类似数据凸显了实体店在覆盖全龄段客户、维系社区纽带方面的社会价值与经济价值。主流零售品牌的门店网络，是其应对人口结构变化、保持基本盘的稳定器。</p>
      
      <p>以下基于全品类超市与便利店、建材家居类超市两大主要零售业态，对加拿大市场主流品牌进行综合介绍与分析。</p>
      
      <h2>一、全品类超市与便利店：万家门店构筑日常消费网络</h2>
      
      <p>加拿大全品类超市及便利店市场高度发达，主要由国际大型连锁品牌与区域型本地超市共同构成，覆盖都会区至偏远社区，形成密集的零售服务网络。</p>
      
      <h3>国际巨头主导大众市场</h3>
      
      <p><strong>Costco：</strong>以会员制仓储式卖场模式著称，凭借大批量、低单价的商品策略吸引家庭及中小企业客户。其自有品牌Kirkland Signature覆盖食品、日用品等多品类，品质与价格优势明显。</p>
      
      <p><strong>Walmart：</strong>作为全渠道零售领导者，Walmart在加拿大拥有庞大的超级中心与线上平台，以“天天低价”策略占据市场份额，商品范围从生鲜食品到家电服装一应俱全。</p>
      
      <h3>本土连锁超市区域深耕</h3>
      
      <ul>
        <li>Metro、Provigo、IGA、Longo’s 等品牌在魁北克、安大略等省份拥有较强影响力，注重本地化选品与社区服务。例如，Metro强调生鲜品质与店内体验，Provigo（隶属Loblaw集团）则以多样自有品牌及积分系统增强用户黏性。</li>
        <li>Sobeys 及其旗下品牌如 FreshCo、Foodland等覆盖全国，尤其在东部地区占据重要地位，通过差异化门店形态适应不同客群需求。</li>
      </ul>
      
      <h3>便利店与药妆集成零售</h3>
      
      <ul>
        <li>Couche-Tard（旗下包括Circle K）是全球便利店巨头之一，在加拿大布局密集，提供即时消费品、零食及加油服务，满足便捷性与应急需求。</li>
        <li>Shoppers Drug Mart（Pharmaprix为其在魁省名称） 与 Jean Coutu 等将药房服务与日用零售深度结合，美妆、健康品类尤为突出，成为社区健康与美容消费的重要节点。</li>
      </ul>
      
      <h3>特点总结：</h3>
      
      <p>该板块体现了加拿大零售市场的高度整合与区域差异性。国际品牌以规模与效率取胜，本土企业则依靠地域渗透与商品差异化竞争。近年来，线上线下融合、自有品牌开发及健康、有机产品增长成为关键趋势。</p>
      
      <h2>二、建材家居类超市：千店规模的专业与DIY双轨并行</h2>
      
      <p>加拿大建材家居零售市场集中度较高，主要玩家包括全国性大型连锁与区域性专业经销商，满足专业建筑商与DIY家装用户的双重需求。</p>
      
      <h3>全国领导品牌格局稳固</h3>
      
      <ul>
        <li><strong>Home Depot</strong> 作为全球头部家居建材零售商，在加拿大凭借齐全的商品种类、专业建议及工具租赁服务，占据市场主导地位，深受专业承包商与DIY爱好者信赖。</li>
        <li><strong>RONA</strong>（后被Lowe’s收购，部分门店正进行整合）是加拿大本土重要品牌，通过“RONA+”等大型门店与社区门店网络结合，覆盖不同区域市场，强调本地化供应链与产品适配性。</li>
      </ul>
      
      <h3>区域与专业型零售商补充细分市场</h3>
      
      <ul>
        <li><strong>Réno-Dépôt</strong>（属Lowe’s加拿大体系）在魁北克等地具有影响力，定位与Home Depot类似，主打建材全品类与家装解决方案。</li>
        <li><strong>BMR、Canac、Patrick Morin</strong> 等区域品牌在魁省及沿海省份深耕，注重建筑材料批发及农场景观类产品，服务专业客户群体。</li>
        <li><strong>JYSK</strong> 来自丹麦，以平价北欧风格的家居装饰与实用家具见长，填补了中低端软装市场的需求。</li>
      </ul>
      
      <h3>市场趋势与竞争焦点</h3>
      
      <p>加拿大建材家居市场受房地产及家装周期影响显著。近年来，DIY风潮与家居改造需求上升，推动相关品类销售增长。此外，绿色建材、智能家居产品逐渐成为新的增长点。各大品牌均加强线上渠道建设，提供设计灵感、项目指导与配送服务，以提升用户体验。</p>
      
      <h2>三、总结：竞争、整合与本土化并存的零售图景</h2>
      
      <p>加拿大零售市场整体呈现以下特征：</p>
      
      <ol>
        <li>高度集中与区域差异并存：少数大型连锁控制主要市场份额，但区域品牌如IGA、BMR等凭借本地化运营仍在特定区域保持竞争力。</li>
        <li>多元化业态满足不同客群：从Costco的仓储式购物到Shoppers的药妆集成，再到Home Depot的专业家装，不同零售形态精准对应消费场景。</li>
        <li>自有品牌与供应链是关键竞争力：各大零售商均大力发展自有品牌（如Costco的Kirkland、Loblaw的President’s Choice），通过控制供应链降低成本、提升利润。</li>
        <li>数字化与全渠道转型加速：电商、移动购物及店内科技应用成为标准配置，特别是在后疫情时代，线上线下融合成为留住客户的重要手段。</li>
      </ol>
      
      <p>总体来看，加拿大零售市场在全球化与本土化之间形成了独特平衡，主流品牌不仅在规模与效率上竞争，更通过深度理解本地需求、强化社区联结，持续塑造着该国稳定而富有韧性的零售生态。在未来，能够持续优化线下体验、并无缝整合线上线下服务的零售商，将继续在这一稳健而充满活力的市场中占据主导地位。</p>
    </article>
    `,
    founded: "1867",
    industry: "Government",
    employees: "38 million+",
    revenue: "$2.1 trillion GDP",
    headquarters: "Ottawa, Canada",
    details: {
      companies: [
        { name: "7-Eleven" },
        { name: "BMR" },
        { name: "Brunet" },
        { name: "Canac" },
        { name: "Canadian Tire" },
        { name: "Costco" },
        { name: "Couche-Tard" },
        { name: "Filgo" },
        { name: "Giant Tiger" },
        { name: "Harnois Énergies" },
        { name: "IGA" },
        { name: "Jean Coutu" },
        { name: "Matériaux Audet" },
        { name: "Maxi" },
        { name: "MP Materials" },
        { name: "Patrick Morin" },
        { name: "Pharmaprix" },
        { name: "Réno-Dépôt" },
        { name: "RONA" },
        { name: "Super C" },
        { name: "Walmart" },
      ],
    },
  },
  {
    id: "australia",
    name: "Australia 澳洲",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg",
    description:
      "Australia, officially the Commonwealth of Australia, is a sovereign country comprising the mainland of the Australian continent, the island of Tasmania, and numerous smaller islands.",
    founded: "1901",
    industry: "Government",
    employees: "25.7 million+",
    revenue: "$1.6 trillion GDP",
    headquarters: "Canberra, Australia",
    details: {
      companies: [
        { name: "BHP" },
        {
          name: "Commonwealth Bank",
        },
        {
          name: "Woolworths",
        },
      ],
    },
  },
  {
    id: "zealand",
    name: "New Zealand 新西兰",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
    description:
      "New Zealand is an island country in the southwestern Pacific Ocean. It consists of two main landmasses—the North Island and the South Island—and over 700 smaller islands.",
    founded: "1840",
    industry: "Government",
    employees: "5.1 million+",
    revenue: "$249 billion GDP",
    headquarters: "Wellington, New Zealand",
    details: {
      companies: [
        { name: "Fonterra" },
        {
          name: "Air New Zealand",
        },
        { name: "Spark" },
      ],
    },
  },
  {
    id: "cambodia",
    name: "Cambodia 柬埔寨",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg",
    description:
      "Cambodia, officially the Kingdom of Cambodia, is a country located in the southern portion of the Indochinese Peninsula in Southeast Asia.",
    founded: "802",
    industry: "Government",
    employees: "16.7 million+",
    revenue: "$27 billion GDP",
    headquarters: "Phnom Penh, Cambodia",
    details: {
      companies: [
        {
          name: "Cambodia Angkor Air",
        },
        {
          name: "ACLEDA Bank",
        },
      ],
    },
  },
  {
    id: "japan",
    name: "Japan 日本",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
    description:
      "Japan is an island country in East Asia. It is situated in the northwest Pacific Ocean and is bordered on the west by the Sea of Japan.",
    founded: "660 BC",
    industry: "Government",
    employees: "125.8 million+",
    revenue: "$4.9 trillion GDP",
    headquarters: "Tokyo, Japan",
    details: {
      companies: [
        { name: "Toyota" },
        { name: "Sony" },
        { name: "Nintendo" },
        { name: "Honda" },
      ],
    },
  },
];
