jQuery(document).ready(function($) {
	$("fieldset.data-settings-wrapper").hide();
	var wmsURL;
	var initialized;
	var workspace;
	var layerName;
	var selectedAtts;
	var dropdownWMS;
	var dropdownWMSAtts;
	var dropdown;
	var dropdownAtts;
	var strippedWMS;
<<<<<<< HEAD
=======
	var table;
>>>>>>> 4c25da52d640f5f57c1533efae233d8f81d49ebc
	var colorbrewer = { 
		diverging: {
			1:  {2: ['rgb(252,141,89)', 'rgb(153,213,148)'], 3: ['rgb(252,141,89)', 'rgb(255,255,191)', 'rgb(153,213,148)'], 4: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(171,221,164)', 'rgb(43,131,186)'], 5: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(255,255,191)', 'rgb(171,221,164)', 'rgb(43,131,186)'], 6: ['rgb(213,62,79)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(230,245,152)', 'rgb(153,213,148)', 'rgb(50,136,189)'], 7: ['rgb(213,62,79)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(153,213,148)', 'rgb(50,136,189)'], 8: ['rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)'], 9: ['rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)']} ,
			2:  {2: ['rgb(252,141,89)', 'rgb(145,207,96)'], 3: ['rgb(252,141,89)', 'rgb(255,255,191)', 'rgb(145,207,96)'], 4: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(166,217,106)', 'rgb(26,150,65)'], 5: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(255,255,191)', 'rgb(166,217,106)', 'rgb(26,150,65)'], 6: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(217,239,139)', 'rgb(145,207,96)', 'rgb(26,152,80)'], 7: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(145,207,96)', 'rgb(26,152,80)'], 8: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)'], 9: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(217,239,139)', 'rgb(166,217,106)', 'rgb(102,189,99)', 'rgb(26,152,80)']} ,
			3:  {2: ['rgb(239,138,98)', 'rgb(103,169,207)'], 3: ['rgb(239,138,98)', 'rgb(247,247,247)', 'rgb(103,169,207)'], 4: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(146,197,222)', 'rgb(5,113,176)'], 5: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(247,247,247)', 'rgb(146,197,222)', 'rgb(5,113,176)'], 6: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(209,229,240)', 'rgb(103,169,207)', 'rgb(33,102,172)'], 7: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(247,247,247)', 'rgb(209,229,240)', 'rgb(103,169,207)', 'rgb(33,102,172)'], 8: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(209,229,240)', 'rgb(146,197,222)', 'rgb(67,147,195)', 'rgb(33,102,172)'], 9: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(247,247,247)', 'rgb(209,229,240)', 'rgb(146,197,222)', 'rgb(67,147,195)', 'rgb(33,102,172)']} ,
			4:  {2: ['rgb(233,163,201)', 'rgb(161,215,106)'], 3: ['rgb(233,163,201)', 'rgb(247,247,247)', 'rgb(161,215,106)'], 4: ['rgb(208,28,139)', 'rgb(241,182,218)', 'rgb(184,225,134)', 'rgb(77,172,38)'], 5: ['rgb(208,28,139)', 'rgb(241,182,218)', 'rgb(247,247,247)', 'rgb(184,225,134)', 'rgb(77,172,38)'], 6: ['rgb(197,27,125)', 'rgb(233,163,201)', 'rgb(253,224,239)', 'rgb(230,245,208)', 'rgb(161,215,106)', 'rgb(77,146,33)'], 7: ['rgb(197,27,125)', 'rgb(233,163,201)', 'rgb(253,224,239)', 'rgb(247,247,247)', 'rgb(230,245,208)', 'rgb(161,215,106)', 'rgb(77,146,33)'], 8: ['rgb(197,27,125)', 'rgb(222,119,174)', 'rgb(241,182,218)', 'rgb(253,224,239)', 'rgb(230,245,208)', 'rgb(184,225,134)', 'rgb(127,188,65)', 'rgb(77,146,33)'], 9: ['rgb(197,27,125)', 'rgb(222,119,174)', 'rgb(241,182,218)', 'rgb(253,224,239)', 'rgb(247,247,247)', 'rgb(230,245,208)', 'rgb(184,225,134)', 'rgb(127,188,65)', 'rgb(77,146,33)']} ,
			5:  {2: ['rgb(175,141,195)', 'rgb(127,191,123)'], 3: ['rgb(175,141,195)', 'rgb(247,247,247)', 'rgb(127,191,123)'], 4: ['rgb(123,50,148)', 'rgb(194,165,207)', 'rgb(166,219,160)', 'rgb(0,136,55)'], 5: ['rgb(123,50,148)', 'rgb(194,165,207)', 'rgb(247,247,247)', 'rgb(166,219,160)', 'rgb(0,136,55)'], 6: ['rgb(118,42,131)', 'rgb(175,141,195)', 'rgb(231,212,232)', 'rgb(217,240,211)', 'rgb(127,191,123)', 'rgb(27,120,55)'], 7: ['rgb(118,42,131)', 'rgb(175,141,195)', 'rgb(231,212,232)', 'rgb(247,247,247)', 'rgb(217,240,211)', 'rgb(127,191,123)', 'rgb(27,120,55)'], 8: ['rgb(118,42,131)', 'rgb(153,112,171)', 'rgb(194,165,207)', 'rgb(231,212,232)', 'rgb(217,240,211)', 'rgb(166,219,160)', 'rgb(90,174,97)', 'rgb(27,120,55)'], 9: ['rgb(118,42,131)', 'rgb(153,112,171)', 'rgb(194,165,207)', 'rgb(231,212,232)', 'rgb(247,247,247)', 'rgb(217,240,211)', 'rgb(166,219,160)', 'rgb(90,174,97)', 'rgb(27,120,55)']} ,
			6:  {2: ['rgb(252,141,89)', 'rgb(145,191,219)'], 3: ['rgb(252,141,89)', 'rgb(255,255,191)', 'rgb(145,191,219)'], 4: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(171,217,233)', 'rgb(44,123,182)'], 5: ['rgb(215,25,28)', 'rgb(253,174,97)', 'rgb(255,255,191)', 'rgb(171,217,233)', 'rgb(44,123,182)'], 6: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,144)', 'rgb(224,243,248)', 'rgb(145,191,219)', 'rgb(69,117,180)'], 7: ['rgb(215,48,39)', 'rgb(252,141,89)', 'rgb(254,224,144)', 'rgb(255,255,191)', 'rgb(224,243,248)', 'rgb(145,191,219)', 'rgb(69,117,180)'], 8: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)'], 9: ['rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(255,255,191)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)']} ,
			7:  {2: ['rgb(216,179,101)', 'rgb(90,180,172)'], 3: ['rgb(216,179,101)', 'rgb(245,245,245)', 'rgb(90,180,172)'], 4: ['rgb(166,97,26)', 'rgb(223,194,125)', 'rgb(128,205,193)', 'rgb(1,133,113)'], 5: ['rgb(166,97,26)', 'rgb(223,194,125)', 'rgb(245,245,245)', 'rgb(128,205,193)', 'rgb(1,133,113)'], 6: ['rgb(140,81,10)', 'rgb(216,179,101)', 'rgb(246,232,195)', 'rgb(199,234,229)', 'rgb(90,180,172)', 'rgb(1,102,94)'], 7: ['rgb(140,81,10)', 'rgb(216,179,101)', 'rgb(246,232,195)', 'rgb(245,245,245)', 'rgb(199,234,229)', 'rgb(90,180,172)', 'rgb(1,102,94)'], 8: ['rgb(140,81,10)', 'rgb(191,129,45)', 'rgb(223,194,125)', 'rgb(246,232,195)', 'rgb(199,234,229)', 'rgb(128,205,193)', 'rgb(53,151,143)', 'rgb(1,102,94)'], 9: ['rgb(140,81,10)', 'rgb(191,129,45)', 'rgb(223,194,125)', 'rgb(246,232,195)', 'rgb(245,245,245)', 'rgb(199,234,229)', 'rgb(128,205,193)', 'rgb(53,151,143)', 'rgb(1,102,94)']} ,
			8:  {2: ['rgb(239,138,98)', 'rgb(153,153,153)'], 3: ['rgb(239,138,98)', 'rgb(255,255,255)', 'rgb(153,153,153)'], 4: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(186,186,186)', 'rgb(64,64,64)'], 5: ['rgb(202,0,32)', 'rgb(244,165,130)', 'rgb(255,255,255)', 'rgb(186,186,186)', 'rgb(64,64,64)'], 6: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(224,224,224)', 'rgb(153,153,153)', 'rgb(77,77,77)'], 7: ['rgb(178,24,43)', 'rgb(239,138,98)', 'rgb(253,219,199)', 'rgb(255,255,255)', 'rgb(224,224,224)', 'rgb(153,153,153)', 'rgb(77,77,77)'], 8: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(224,224,224)', 'rgb(186,186,186)', 'rgb(135,135,135)', 'rgb(77,77,77)'], 9: ['rgb(178,24,43)', 'rgb(214,96,77)', 'rgb(244,165,130)', 'rgb(253,219,199)', 'rgb(255,255,255)', 'rgb(224,224,224)', 'rgb(186,186,186)', 'rgb(135,135,135)', 'rgb(77,77,77)']} ,
			9:  {2: ['rgb(241,163,64)', 'rgb(153,142,195)'], 3: ['rgb(241,163,64)', 'rgb(247,247,247)', 'rgb(153,142,195)'], 4: ['rgb(230,97,1)', 'rgb(253,184,99)', 'rgb(178,171,210)', 'rgb(94,60,153)'], 5: ['rgb(230,97,1)', 'rgb(253,184,99)', 'rgb(247,247,247)', 'rgb(178,171,210)', 'rgb(94,60,153)'], 6: ['rgb(179,88,6)', 'rgb(241,163,64)', 'rgb(254,224,182)', 'rgb(216,218,235)', 'rgb(153,142,195)', 'rgb(84,39,136)'], 7: ['rgb(179,88,6)', 'rgb(241,163,64)', 'rgb(254,224,182)', 'rgb(247,247,247)', 'rgb(216,218,235)', 'rgb(153,142,195)', 'rgb(84,39,136)'], 8: ['rgb(179,88,6)', 'rgb(224,130,20)', 'rgb(253,184,99)', 'rgb(254,224,182)', 'rgb(216,218,235)', 'rgb(178,171,210)', 'rgb(128,115,172)', 'rgb(84,39,136)'], 9: ['rgb(179,88,6)', 'rgb(224,130,20)', 'rgb(253,184,99)', 'rgb(254,224,182)', 'rgb(247,247,247)', 'rgb(216,218,235)', 'rgb(178,171,210)', 'rgb(128,115,172)', 'rgb(84,39,136)']}
		},
		sequential: {
			1:  {3: ['rgb(254,232,200)', 'rgb(253,187,132)', 'rgb(227,74,51)'], 4: ['rgb(254,240,217)', 'rgb(253,204,138)', 'rgb(252,141,89)', 'rgb(215,48,31)'], 5: ['rgb(254,240,217)', 'rgb(253,204,138)', 'rgb(252,141,89)', 'rgb(227,74,51)', 'rgb(179,0,0)'], 6: ['rgb(254,240,217)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(227,74,51)', 'rgb(179,0,0)'], 7: ['rgb(254,240,217)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(239,101,72)', 'rgb(215,48,31)', 'rgb(153,0,0)'], 8: ['rgb(255,247,236)', 'rgb(254,232,200)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(239,101,72)', 'rgb(215,48,31)', 'rgb(153,0,0)'], 9: ['rgb(255,247,236)', 'rgb(254,232,200)', 'rgb(253,212,158)', 'rgb(253,187,132)', 'rgb(252,141,89)', 'rgb(239,101,72)', 'rgb(215,48,31)', 'rgb(179,0,0)', 'rgb(127,0,0)']} ,
			2:  {3: ['rgb(236,231,242)', 'rgb(166,189,219)', 'rgb(43,140,190)'], 4: ['rgb(241,238,246)', 'rgb(189,201,225)', 'rgb(116,169,207)', 'rgb(5,112,176)'], 5: ['rgb(241,238,246)', 'rgb(189,201,225)', 'rgb(116,169,207)', 'rgb(43,140,190)', 'rgb(4,90,141)'], 6: ['rgb(241,238,246)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(43,140,190)', 'rgb(4,90,141)'], 7: ['rgb(241,238,246)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(3,78,123)'], 8: ['rgb(255,247,251)', 'rgb(236,231,242)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(3,78,123)'], 9: ['rgb(255,247,251)', 'rgb(236,231,242)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(4,90,141)', 'rgb(2,56,88)']} ,
			3:  {3: ['rgb(224,236,244)', 'rgb(158,188,218)', 'rgb(136,86,167)'], 4: ['rgb(237,248,251)', 'rgb(179,205,227)', 'rgb(140,150,198)', 'rgb(136,65,157)'], 5: ['rgb(237,248,251)', 'rgb(179,205,227)', 'rgb(140,150,198)', 'rgb(136,86,167)', 'rgb(129,15,124)'], 6: ['rgb(237,248,251)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(136,86,167)', 'rgb(129,15,124)'], 7: ['rgb(237,248,251)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(110,1,107)'], 8: ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(110,1,107)'], 9: ['rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)', 'rgb(136,65,157)', 'rgb(129,15,124)', 'rgb(77,0,75)']} ,
			4:  {3: ['rgb(254,230,206)', 'rgb(253,174,107)', 'rgb(230,85,13)'], 4: ['rgb(254,237,222)', 'rgb(253,190,133)', 'rgb(253,141,60)', 'rgb(217,71,1)'], 5: ['rgb(254,237,222)', 'rgb(253,190,133)', 'rgb(253,141,60)', 'rgb(230,85,13)', 'rgb(166,54,3)'], 6: ['rgb(254,237,222)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(230,85,13)', 'rgb(166,54,3)'], 7: ['rgb(254,237,222)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(140,45,4)'], 8: ['rgb(255,245,235)', 'rgb(254,230,206)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(140,45,4)'], 9: ['rgb(255,245,235)', 'rgb(254,230,206)', 'rgb(253,208,162)', 'rgb(253,174,107)', 'rgb(253,141,60)', 'rgb(241,105,19)', 'rgb(217,72,1)', 'rgb(166,54,3)', 'rgb(127,39,4)']} ,
			5:  {3: ['rgb(229,245,249)', 'rgb(153,216,201)', 'rgb(44,162,95)'], 4: ['rgb(237,248,251)', 'rgb(178,226,226)', 'rgb(102,194,164)', 'rgb(35,139,69)'], 5: ['rgb(237,248,251)', 'rgb(178,226,226)', 'rgb(102,194,164)', 'rgb(44,162,95)', 'rgb(0,109,44)'], 6: ['rgb(237,248,251)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(44,162,95)', 'rgb(0,109,44)'], 7: ['rgb(237,248,251)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(65,174,118)', 'rgb(35,139,69)', 'rgb(0,88,36)'], 8: ['rgb(247,252,253)', 'rgb(229,245,249)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(65,174,118)', 'rgb(35,139,69)', 'rgb(0,88,36)'], 9: ['rgb(247,252,253)', 'rgb(229,245,249)', 'rgb(204,236,230)', 'rgb(153,216,201)', 'rgb(102,194,164)', 'rgb(65,174,118)', 'rgb(35,139,69)', 'rgb(0,109,44)', 'rgb(0,68,27)']} ,
			6:  {3: ['rgb(255,247,188)', 'rgb(254,196,79)', 'rgb(217,95,14)'], 4: ['rgb(255,255,212)', 'rgb(254,217,142)', 'rgb(254,153,41)', 'rgb(204,76,2)'], 5: ['rgb(255,255,212)', 'rgb(254,217,142)', 'rgb(254,153,41)', 'rgb(217,95,14)', 'rgb(153,52,4)'], 6: ['rgb(255,255,212)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(217,95,14)', 'rgb(153,52,4)'], 7: ['rgb(255,255,212)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(140,45,4)'], 8: ['rgb(255,255,229)', 'rgb(255,247,188)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(140,45,4)'], 9: ['rgb(255,255,229)', 'rgb(255,247,188)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(153,52,4)', 'rgb(102,37,6)']} ,
			7:  {3: ['rgb(247,252,185)', 'rgb(173,221,142)', 'rgb(49,163,84)'], 4: ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(35,132,67)'], 5: ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)', 'rgb(0,104,55)'], 6: ['rgb(255,255,204)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(49,163,84)', 'rgb(0,104,55)'], 7: ['rgb(255,255,204)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,90,50)'], 8: ['rgb(255,255,229)', 'rgb(247,252,185)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,90,50)'], 9: ['rgb(255,255,229)', 'rgb(247,252,185)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,104,55)', 'rgb(0,69,41)']} ,
			8:  {3: ['rgb(254,224,210)', 'rgb(252,146,114)', 'rgb(222,45,38)'], 4: ['rgb(254,229,217)', 'rgb(252,174,145)', 'rgb(251,106,74)', 'rgb(203,24,29)'], 5: ['rgb(254,229,217)', 'rgb(252,174,145)', 'rgb(251,106,74)', 'rgb(222,45,38)', 'rgb(165,15,21)'], 6: ['rgb(254,229,217)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(222,45,38)', 'rgb(165,15,21)'], 7: ['rgb(254,229,217)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(153,0,13)'], 8: ['rgb(255,245,240)', 'rgb(254,224,210)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(153,0,13)'], 9: ['rgb(255,245,240)', 'rgb(254,224,210)', 'rgb(252,187,161)', 'rgb(252,146,114)', 'rgb(251,106,74)', 'rgb(239,59,44)', 'rgb(203,24,29)', 'rgb(165,15,21)', 'rgb(103,0,13)']} ,
			9:  {3: ['rgb(253,224,221)', 'rgb(250,159,181)', 'rgb(197,27,138)'], 4: ['rgb(254,235,226)', 'rgb(251,180,185)', 'rgb(247,104,161)', 'rgb(174,1,126)'], 5: ['rgb(254,235,226)', 'rgb(251,180,185)', 'rgb(247,104,161)', 'rgb(197,27,138)', 'rgb(122,1,119)'], 6: ['rgb(254,235,226)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(197,27,138)', 'rgb(122,1,119)'], 7: ['rgb(254,235,226)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)'], 8: ['rgb(255,247,243)', 'rgb(253,224,221)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)'], 9: ['rgb(255,247,243)', 'rgb(253,224,221)', 'rgb(252,197,192)', 'rgb(250,159,181)', 'rgb(247,104,161)', 'rgb(221,52,151)', 'rgb(174,1,126)', 'rgb(122,1,119)', 'rgb(73,0,106)']} ,
			10:  {3: ['rgb(229,245,224)', 'rgb(161,217,155)', 'rgb(49,163,84)'], 4: ['rgb(237,248,233)', 'rgb(186,228,179)', 'rgb(116,196,118)', 'rgb(35,139,69)'], 5: ['rgb(237,248,233)', 'rgb(186,228,179)', 'rgb(116,196,118)', 'rgb(49,163,84)', 'rgb(0,109,44)'], 6: ['rgb(237,248,233)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(49,163,84)', 'rgb(0,109,44)'], 7: ['rgb(237,248,233)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(65,171,93)', 'rgb(35,139,69)', 'rgb(0,90,50)'], 8: ['rgb(247,252,245)', 'rgb(229,245,224)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(65,171,93)', 'rgb(35,139,69)', 'rgb(0,90,50)'], 9: ['rgb(247,252,245)', 'rgb(229,245,224)', 'rgb(199,233,192)', 'rgb(161,217,155)', 'rgb(116,196,118)', 'rgb(65,171,93)', 'rgb(35,139,69)', 'rgb(0,109,44)', 'rgb(0,68,27)']} ,
			11:  {3: ['rgb(237,248,177)', 'rgb(127,205,187)', 'rgb(44,127,184)'], 4: ['rgb(255,255,204)', 'rgb(161,218,180)', 'rgb(65,182,196)', 'rgb(34,94,168)'], 5: ['rgb(255,255,204)', 'rgb(161,218,180)', 'rgb(65,182,196)', 'rgb(44,127,184)', 'rgb(37,52,148)'], 6: ['rgb(255,255,204)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(44,127,184)', 'rgb(37,52,148)'], 7: ['rgb(255,255,204)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(12,44,132)'], 8: ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(12,44,132)'], 9: ['rgb(255,255,217)', 'rgb(237,248,177)', 'rgb(199,233,180)', 'rgb(127,205,187)', 'rgb(65,182,196)', 'rgb(29,145,192)', 'rgb(34,94,168)', 'rgb(37,52,148)', 'rgb(8,29,88)']} ,
			12:  {3: ['rgb(239,237,245)', 'rgb(188,189,220)', 'rgb(117,107,177)'], 4: ['rgb(242,240,247)', 'rgb(203,201,226)', 'rgb(158,154,200)', 'rgb(106,81,163)'], 5: ['rgb(242,240,247)', 'rgb(203,201,226)', 'rgb(158,154,200)', 'rgb(117,107,177)', 'rgb(84,39,143)'], 6: ['rgb(242,240,247)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(117,107,177)', 'rgb(84,39,143)'], 7: ['rgb(242,240,247)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(74,20,134)'], 8: ['rgb(252,251,253)', 'rgb(239,237,245)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(74,20,134)'], 9: ['rgb(252,251,253)', 'rgb(239,237,245)', 'rgb(218,218,235)', 'rgb(188,189,220)', 'rgb(158,154,200)', 'rgb(128,125,186)', 'rgb(106,81,163)', 'rgb(84,39,143)', 'rgb(63,0,125)']} ,
			13:  {3: ['rgb(224,243,219)', 'rgb(168,221,181)', 'rgb(67,162,202)'], 4: ['rgb(240,249,232)', 'rgb(186,228,188)', 'rgb(123,204,196)', 'rgb(43,140,190)'], 5: ['rgb(240,249,232)', 'rgb(186,228,188)', 'rgb(123,204,196)', 'rgb(67,162,202)', 'rgb(8,104,172)'], 6: ['rgb(240,249,232)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(67,162,202)', 'rgb(8,104,172)'], 7: ['rgb(240,249,232)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(78,179,211)', 'rgb(43,140,190)', 'rgb(8,88,158)'], 8: ['rgb(247,252,240)', 'rgb(224,243,219)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(78,179,211)', 'rgb(43,140,190)', 'rgb(8,88,158)'], 9: ['rgb(247,252,240)', 'rgb(224,243,219)', 'rgb(204,235,197)', 'rgb(168,221,181)', 'rgb(123,204,196)', 'rgb(78,179,211)', 'rgb(43,140,190)', 'rgb(8,104,172)', 'rgb(8,64,129)']} ,
			14:  {3: ['rgb(240,240,240)', 'rgb(189,189,189)', 'rgb(99,99,99)'], 4: ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(82,82,82)'], 5: ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(99,99,99)', 'rgb(37,37,37)'], 6: ['rgb(247,247,247)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(99,99,99)', 'rgb(37,37,37)'], 7: ['rgb(247,247,247)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)'], 8: ['rgb(255,255,255)', 'rgb(240,240,240)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)'], 9: ['rgb(255,255,255)', 'rgb(240,240,240)', 'rgb(217,217,217)', 'rgb(189,189,189)', 'rgb(150,150,150)', 'rgb(115,115,115)', 'rgb(82,82,82)', 'rgb(37,37,37)', 'rgb(0,0,0)']} ,
			15:  {3: ['rgb(255,237,160)', 'rgb(254,178,76)', 'rgb(240,59,32)'], 4: ['rgb(255,255,178)', 'rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(227,26,28)'], 5: ['rgb(255,255,178)', 'rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(240,59,32)', 'rgb(189,0,38)'], 6: ['rgb(255,255,178)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(240,59,32)', 'rgb(189,0,38)'], 7: ['rgb(255,255,178)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(252,78,42)', 'rgb(227,26,28)', 'rgb(177,0,38)'], 8: ['rgb(255,255,204)', 'rgb(255,237,160)', 'rgb(254,217,118)', 'rgb(254,178,76)', 'rgb(253,141,60)', 'rgb(252,78,42)', 'rgb(227,26,28)', 'rgb(177,0,38)'], 9:['rgb(255,255,204)','rgb(255,237,160)','rgb(254,217,118)','rgb(254,178,76)','rgb(253,141,60)','rgb(252,78,42)','rgb(227,26,28)','rgb(189,0,38)','rgb(128,0,38)']} ,
			16:  {3: ['rgb(231,225,239)', 'rgb(201,148,199)', 'rgb(221,28,119)'], 4: ['rgb(241,238,246)', 'rgb(215,181,216)', 'rgb(223,101,176)', 'rgb(206,18,86)'], 5: ['rgb(241,238,246)', 'rgb(215,181,216)', 'rgb(223,101,176)', 'rgb(221,28,119)', 'rgb(152,0,67)'], 6: ['rgb(241,238,246)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(221,28,119)', 'rgb(152,0,67)'], 7: ['rgb(241,238,246)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(231,41,138)', 'rgb(206,18,86)', 'rgb(145,0,63)'], 8: ['rgb(247,244,249)', 'rgb(231,225,239)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(231,41,138)', 'rgb(206,18,86)', 'rgb(145,0,63)'], 9: ['rgb(247,244,249)', 'rgb(231,225,239)', 'rgb(212,185,218)', 'rgb(201,148,199)', 'rgb(223,101,176)', 'rgb(231,41,138)', 'rgb(206,18,86)', 'rgb(152,0,67)', 'rgb(103,0,31)']} ,
			17:  {3: ['rgb(222,235,247)', 'rgb(158,202,225)', 'rgb(49,130,189)'], 4: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(33,113,181)'], 5: ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'], 6: ['rgb(239,243,255)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'], 7: ['rgb(239,243,255)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,69,148)'], 8: ['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,69,148)'], 9: ['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,81,156)', 'rgb(8,48,107)']} ,
			18:  {3: ['rgb(236,226,240)', 'rgb(166,189,219)', 'rgb(28,144,153)'], 4: ['rgb(246,239,247)', 'rgb(189,201,225)', 'rgb(103,169,207)', 'rgb(2,129,138)'], 5: ['rgb(246,239,247)', 'rgb(189,201,225)', 'rgb(103,169,207)', 'rgb(28,144,153)', 'rgb(1,108,89)'], 6: ['rgb(246,239,247)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(28,144,153)', 'rgb(1,108,89)'], 7: ['rgb(246,239,247)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(54,144,192)', 'rgb(2,129,138)', 'rgb(1,100,80)'], 8: ['rgb(255,247,251)', 'rgb(236,226,240)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(54,144,192)', 'rgb(2,129,138)', 'rgb(1,100,80)'], 9: ['rgb(255,247,251)', 'rgb(236,226,240)', 'rgb(208,209,230)', 'rgb(166,189,219)', 'rgb(103,169,207)', 'rgb(54,144,192)', 'rgb(2,129,138)', 'rgb(1,108,89)', 'rgb(1,70,54)']}
		}
	}
	//this will clean the form the first time we load the JS
	dataEdit();
	//the behavior below will clean the form each time it's loaded after the initial load.
	Drupal.behaviors.dataEditPrep = {
		attach:function(context, settings){
			if (($("form.node-data-edit-form").length) || ($("form.node-data-form").length) || ($("div.form-item-inline-entity-form-field-indi-get-data-from").length)){
				dataEdit();
			}
		}
	};
	
	function dataEdit(){
		$("select[data-drupal-selector=edit-field-data-classes], select[data-drupal-selector=edit-inline-entity-form-field-data-classes]").change(function() {
			if ($(this).val() >= 2){
				rebuildColorSwatch($(this).val());
			} else {
				rebuildColorSwatch(3);
			}		
		});
		function rebuildColorSwatch(selectedNumClasses){
			if (!$( "#edit-ramps-diverging" ).length){
				$( '<H5>Diverging</H5>'+
					'<div id="edit-ramps-diverging">' +
					'</div>'+	
					'<H5>Sequential</H5>'+
					'<div id="edit-ramps-sequential">' +
					'</div>' ).insertAfter( "select[data-drupal-selector=edit-field-data-classes], select[data-drupal-selector=edit-inline-entity-form-field-data-classes]" );
			}
			$("#edit-ramps-diverging, #edit-ramps-sequential").empty();
			for ( var i in colorbrewer.diverging ){
				var ramp = $("<div class='ramp colorbrewdiverging-"+ i +"'></div>"),
					svg = "<svg width='15' height='"+selectedNumClasses*15+"'>";
				for ( var n = 0; n < selectedNumClasses; n++ ){
					svg += "<rect fill="+colorbrewer.diverging[i][selectedNumClasses][n]+" width='15' height='15' y='"+n*15+"'/>";
				}
				svg += "</svg>";
				$("#edit-ramps-diverging").append(ramp.append(svg).click( function(){
					if ( $(this).hasClass("selected") ) return;
					setScheme( $(this).attr("class").substr(14) );
				}));
			}
			for ( var i in colorbrewer.sequential ){
				var ramp = $("<div class='ramp colorbrewsequential-"+ i +"'></div>"),
					svg = "<svg width='15' height='"+selectedNumClasses*15+"'>";
				for ( var n = 0; n < selectedNumClasses; n++ ){
					svg += "<rect fill="+colorbrewer.sequential[i][selectedNumClasses][n]+" width='15' height='15' y='"+n*15+"'/>";
				}
				svg += "</svg>";
				$("#edit-ramps-sequential").append(ramp.append(svg).click( function(){
					if ( $(this).hasClass("selected") ) return;
					setScheme( $(this).attr("class").substr(14) );
				}));
			}
			if ($("input[data-drupal-selector=edit-field-data-color-swatch-0-value").val().length){
				setScheme( $("input[data-drupal-selector=edit-field-data-color-swatch-0-value").val() );
			}
		}
		function setScheme(selectedScheme)
		{
			$(".ramp.selected").removeClass("selected");
			$(".ramp.colorbrew"+selectedScheme).addClass("selected");
			$("input[data-drupal-selector=edit-field-data-color-swatch-0-value").val(selectedScheme)
		}

		//Run this when the data type is selected (REST or Geonode Layer)
		$("select[data-drupal-selector=edit-field-indi-get-data-from], select[data-drupal-selector=edit-inline-entity-form-field-indi-get-data-from]").change(function() {
			$("div#wms-errors").empty().removeClass("alert-danger").removeClass("alert-success");
			$("fieldset.data-settings-wrapper").hide();
			var dataType = $( this ).val();
			switch (dataType) {
				case 'REST':
					$("fieldset.rest-settings-wrapper").show();
					break;
				case 'External Map Data':
					$("fieldset.wms-settings-wrapper").show();
					buildExternalForm()
					break;
				case 'Upload Shapefile':
					$("fieldset.shapefile-settings-wrapper").show();
					break;
				case 'BIOPAMA Geonode':
					$("fieldset.geonode-settings-wrapper").show();
					buildGeonodeForm();
					break;
				case 'Google Sheets':
					$("fieldset.sheets-settings-wrapper").show();
<<<<<<< HEAD
=======
					buildSheetsForm();
>>>>>>> 4c25da52d640f5f57c1533efae233d8f81d49ebc
					break;
				default:
					$("fieldset.data-settings-wrapper").hide();
			}
<<<<<<< HEAD
=======
			function buildSheetsForm(){
				if (!$("div#google-sheets-wrapper").length){
					$('<div id="google-sheets-wrapper"><button type="button" class="btn btn-primary sheets-search disabled">Check Sheet</button><div id="google-sheets-results-wrapper"><table id="google-sheets-results" class="display" width="100%"></table></div></div>').appendTo("fieldset.form-item-field-data-sheet-range-0-value");
				}
				$("input[data-drupal-selector=edit-field-data-spreadsheet-id-0-value], input[data-drupal-selector=edit-inline-entity-form-field-data-spreadsheet-id-0-value]").on("keyup change", function() {
					if($( this ).val().length > 10){
						$("button.sheets-search").removeClass("disabled");
					} else {
						$("button.sheets-search").addClass("disabled");
					}
				});
				$( "button.sheets-search" ).click(function() {
					var sheetID = $("input[data-drupal-selector=edit-field-data-spreadsheet-id-0-value]").val();
					var majorDimension = $("select[data-drupal-selector=edit-field-data-major-dimension]").val();
					var sheetRange = $("input[data-drupal-selector=edit-field-data-sheet-range-0-value]").val();
					var sheetsAPIKey = "AIzaSyB0OVn5gxjWkwOczbPdHYU_sMNZzxscADQ";
					
					if (sheetRange.length < 4){
						sheetRange = "A1:Z1000";
					}
					if (majorDimension !== 'COLUMNS') majorDimension = 'ROWS';
					//https://content-sheets.googleapis.com/v4/spreadsheets/1xYPaA-eDLUXWdjIRaT4oaO2S861PCVE051C_OTMBumk/values/A1%3AZ1000?valueRenderOption=FORMATTED_VALUE&majorDimension=COLUMNS&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM
					var sheetURL = "https://sheets.googleapis.com/v4/spreadsheets/"+sheetID+"/values/"+sheetRange+"?valueRenderOption=FORMATTED_VALUE&majorDimension="+majorDimension+"&key="+sheetsAPIKey

					var jqxhr = $.getJSON(sheetURL, function() {
						console.log( "success" );
					}).done(function(data) {
						var results = data.values;
						var columnTitles = [];
						if ( $.fn.DataTable.isDataTable( '#google-sheets-results' ) ) {
							table.clear();
							table.destroy();
							$('#google-sheets-results').empty();
							$('#google-sheets-results').html('<table id="google-sheets-results" class="display" width="100%"></table>');
						} 				
						for(var i = 0; i < results[0].length; i++){
							var titleObj = {
								title: results[0][i]
							}
							columnTitles.push(titleObj)
						}
						results.shift();
				
						table = $('#google-sheets-results').DataTable( {
							data: results,
							columns: columnTitles,
							"bFilter": false,
							"drawCallback": function(settings) {
								console.log(settings)
								if (settings._iDisplayLength >= settings.fnRecordsDisplay()) {
									$(settings.nTableWrapper).find('.dataTables_paginate').hide();
									$(settings.nTableWrapper).find('.dataTables_length').hide();
								}
							}
						});

					}).fail(function() {
						console.log( "table creation error" );
					});
				});
			}
>>>>>>> 4c25da52d640f5f57c1533efae233d8f81d49ebc
			function buildExternalForm(){
				if (!$("div.wms-search-wrapper").length){
					/*
					We need to construct the complete Form for filling the WMS layer settings
					This includes: search button, layer select, and attribute select. 
					*/
					$( '<div class="wms-search-wrapper">' +
					'<div id="wms-errors" class="alert wms-error" role="alert"></div><br><button type="button" class="btn btn-primary wms-service-search disabled">Search WMS Server</button><br>'+
					'<div id="wms-layers-wrapper">' +
					'<div id="wms-layers">WMS Layers: <select id="wms-dropdown" class="chosen-select" name="WMS Layers"></select></div>' +
					'</div>' +
					'<div id="wms-layer-atts-wrapper">' +
					'<div id="wms-layer-atts">Layer Attributes: <select id="wms-atts" multiple class="chosen-select" data-placeholder="Choose layer Attributes" name="Layer Attributes"></select></div>' +
					'</div>' +
					'</div>' ).appendTo( "fieldset.form-item-field-wms-base-url-0-value, div#edit-inline-entity-form-field-wms-base-url-wrapper" );
					dropdownWMS = $('select#wms-dropdown');
					dropdownWMSAtts = $('select#wms-atts');
					dropdownWMS.hide();
					dropdownWMSAtts.hide();
/* 					//we also attach an error container to the main form container
					$( '<div id="wms-errors" class="alert wms-error" role="alert"></div>').appendTo( "form.node-data-form" );
					$( '<div id="wms-errors" class="alert wms-error" role="alert"></div>').appendTo( "form.node-data-edit-form" );
					$( '<div id="wms-errors" class="alert wms-error" role="alert"></div>').appendTo( "form.entity-browser-form" ); */
				}
				$( "button.wms-service-search" ).click(function() {
					if ($(this).hasClass("disabled")) {
						console.log("it's not available dummy");
					} else {
						checkWmsServices(); 
					}
				});
				$("input[data-drupal-selector=edit-field-wms-base-url-0-value], input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]").change(function() {
					$("div#wms-errors").empty().removeClass("alert-danger").removeClass("alert-success");
					var URLerrors = 0;
					wmsURL = $( this ).val().toLowerCase();
					var URLQuestionMark = wmsURL.slice(-1);
					if(wmsURL.indexOf("https://") == -1) {
						$( '<div>The URL requires HTTPS</div>' ).appendTo( "div#wms-errors" );
						URLerrors = 1;
					} 
					if((wmsURL.indexOf("ows") == -1)&&(wmsURL.indexOf("wms") == -1)) {
						$( '<div>The URL does not appear to include a WMS or OWS service</div>' ).appendTo( "div#wms-errors" );
						URLerrors = 1;
					}
					if(URLQuestionMark !== "?") {
						$( '<div>You forgot to add the question mark to the end of the URL</div>' ).appendTo( "div#wms-errors" );
						URLerrors = 1;
					}
					if(URLerrors == 0) {
						$("div#wms-errors").addClass("alert-success");
						$( '<div>The URL looks good.</div>' ).appendTo( "div#wms-errors" );
						$("button.wms-service-search").removeClass("disabled");
					} else {
						$( "div#wms-errors" ).addClass("alert-danger");
						$("button.wms-service-search").addClass("disabled");
					}
				});
				$("input[data-drupal-selector=edit-field-wms-base-url-0-value]").trigger("change");
				$("input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]").trigger("change");
			}
			function buildGeonodeForm(){
				$( '<div id="geonode-layers">GeoNode Layers: <select id="geonode-dropdown" name="Geonode Layers"></select></div>'+
				'<div id="geonode-attributes">Layer attributes<select id="geonode-layer-atts" name="Layer Attributes"></select></div>' ).insertAfter( "fieldset.form-item-field-indi-data-type" );
				dropdown = $('#geonode-dropdown');
				dropdownAtts = $('#geonode-layer-atts');
				$('#geonode-attributes').hide();
				dropdown.append('<option selected="true" disabled>Choose a Layer</option>');
				$.ajax({
					url: 'http://biopama.org:32788/geoserver/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=results&elementSetName=full&maxRecords=150',
					dataType: 'text',
					success: xmlParser,
					error: function (jqXHR, tranStatus, errorThrown) {
						console.log(
							'Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
							'Response: ' + jqXHR.responseText
						);
					}
				});
				
				dropdown.change(function() {
					var layerName = $( this ).val();
					$( "#geonode-dropdown option:selected" ).each(function() {
						$.ajax({
							url: 'http://biopama.org:32788/geoserver/ows?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeNames='+layerName,
							crossDomain: true,
							success: jsonParser,
							error: function (jqXHR, tranStatus, errorThrown) {
								dropdownAtts.empty().show().append('<option selected="true" disabled>This one is a raster, try selecting another layer.</option>');
								console.log(
									'Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
									'Response: ' + jqXHR.responseText
								); 
							}
						});
					});
				});
				
				function xmlParser(xml) {
					var xmlResult = $.parseXML( xml );
					$xml = $(xmlResult);
					var thisTitle;
					var thisID;
					$xml.find('csw\\:Record').each(function () {
						thisTitle = $(this).find("dc\\:title").text()
						thisID = $(this).find("dc\\:identifier").text()
						dropdown.append($('<option></option>').attr('value', thisID).text(thisTitle));
					});
				}
				function jsonParser(d) {
					$('#geonode-attributes').show()
					dropdownAtts.empty().append('<option selected="true" disabled>Select an Attribute</option>');
					$(d.featureTypes[0].properties).each(function(i, data) {
						dropdownAtts.append($('<option></option>').text(d.featureTypes[0].properties[i].name + ' | ' + d.featureTypes[0].properties[i].type));
					}); 

				}
			}
		});
		$("select[data-drupal-selector=edit-field-data-classes]").trigger("change");
		$("select[data-drupal-selector=edit-inline-entity-form-field-data-classes]").trigger("change");
		$("select[data-drupal-selector=edit-field-indi-get-data-from]").trigger("change");
		$("select[data-drupal-selector=edit-inline-entity-form-field-indi-get-data-from]").trigger("change");
		$("input[data-drupal-selector=edit-field-data-spreadsheet-id-0-value]").trigger("change");
		$("input[data-drupal-selector=edit-inline-entity-form-field-data-spreadsheet-id-0-value]").trigger("change");
	}

	function checkWmsServices(){
		if ($( "input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]" ).length){
			wmsURL = $( "input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]" ).val();
		} else {
			wmsURL = $( "input[data-drupal-selector=edit-field-wms-base-url-0-value]" ).val();
		}
		var wmsGetCapabilitiesRequest = wmsURL + "service=WMS&version=3.0.0&request=GetCapabilities";

		//console.log(wmsGetCapabilitiesRequest);
		$.ajax({
			url: wmsGetCapabilitiesRequest,
			dataType: "xml",
			success: externalxmlParser,
			error: function (jqXHR, tranStatus, errorThrown) {
				$( "div#wms-errors" ).empty().removeClass("alert-success").addClass("alert-danger");
				$("div#wms-errors").html('<div>There was an error checking the GetCapabilities: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
					'Response: ' + jqXHR.responseText + '</div>');
			}
		});
	}
	function externalxmlParser(xml) {
		//our WMS works. Set the workspace and procceed to next steps (layer selection)
		workspace = wmsURL.match(/(geoserver\/)(.*\n?)(?=\/)/g); //this is for cross browser compatibility. First take geoserver/workspace
		//workspace = workspace.match(/(\/)(.*\n?)/g); //then cut out geoserver
		workspace = workspace[0].split('/');
		workspace = workspace[1]; 
		//we hide the error containers in 2 places, at the change of the previous element, and at the change of the current element as you never know if a user is doubling back on the form.
		//WMSerrorHideShow("wms-errors");
		$( "div#wms-errors" ).empty().removeClass("alert-danger").addClass("alert-success").html('<div>Get Capabilities works, please pick a layer.</div>');

		dropdownWMS.chosen({width: "100%"}).empty().show(); //set the Layer list to chosen, empty it out and show it.

		var $Layers = $(xml).find("Layer");
		$Layers.each(function(){
			var thisTitle = $(this).find("Title:first").text()
			dropdownWMS.append($('<option></option>').attr('value', thisTitle).text(thisTitle)).trigger("chosen:updated");
		});

		dropdownWMS.chosen().change(function(e, params){
			layerName = $( this ).val();

			//the first thing to test is if the selected layer supports WFS. We do this by trying a WFS request.
			//to do the request we construct the WFS URL
			strippedWMS = wmsURL.match(/^.*geoserver\//g);
			var finishedWMSURLtest = encodeURI(strippedWMS + workspace + "/ows?service=wfs&version=1.1.0&request=getfeature&MAXFEATURES=1&typename=" + workspace+ ":" + layerName + "&PROPERTYNAME=,"+"&outputFormat=application/json");
			//we MUST check if this layer can even support WFS before trying to get the attributes.
			$.ajax({
				url: finishedWMSURLtest,
				crossDomain: true,
				success: checkWFSURLCompatibility,
				error: function (jqXHR, tranStatus, errorThrown) {
					$("div#wms-errors").empty().removeClass("alert-success").addClass("alert-danger").html('<div>There is something wrong.<br>Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
					'Response: ' + jqXHR.responseText + '</div>');
				}
			});
		});
	}
	function checkWFSURLCompatibility(xml) {
		if ($.isXMLDoc( xml )){ //check FAILED. Not WFS compatible
			$("div#wms-errors").empty().removeClass("alert-success").addClass("alert-danger").html('<div>This layer does not appear to support WFS.</div>');
		} else { //we have a working WFS, so we load the layer attribute selection
			$( "#wms-dropdown option:selected" ).each(function() {
				var wmsLayerAttributesURL = wmsURL + 'version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeNames=' + layerName;
				$.ajax({
					url: wmsLayerAttributesURL,
					crossDomain: true,
					success: externaljsonParser,
					error: function (jqXHR, tranStatus, errorThrown) {
						$( "div#wms-errors" ).empty().removeClass("alert-success").addClass("alert-danger");
						$("div#wms-errors").addClass("alert-danger").html('<div>Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
						'Response: ' + jqXHR.responseText + '</div>');
					}
				});
			});			
		}
	}
	function externaljsonParser(d) {
		$( "div#wms-errors" ).empty().removeClass("alert-danger").addClass("alert-success").html('<div>The layer WFS works, select some attributes from the layer.</div>');
		
		dropdownWMSAtts.empty().chosen({no_results_text: "No features found using: ", width: "100%", max_selected_options: 10}).show(); 
		if (!$("div.att-chart-info").length){
			$("#wms-settings-wrapper").append('<div>'+
				'<div class="alert alert-info att-chart-info" role="alert">You must select which features you want to use in the CHART. '+
				'Any features you choose will appear in theis text area to be copied for use when creating the chart in the next step.</div>'+
				'<textarea style="width: 100%; height: 100px;" id="wms-feature-copy"></textarea><br>'+
				'<a href="#" id="WMScopyButton" class="btn btn-secondary btn-sm" role="button">Copy</a>'+
			'</div>');
		}
		//var input = document.getElementById('wms-feature-copy');
		$(d.featureTypes[0].properties).each(function(i, data) {
			//$('#wms-feature-copy').append(d.featureTypes[0].properties[i].name + ' | ' + d.featureTypes[0].properties[i].type + '\\\n');
			dropdownWMSAtts.append($('<option></option>').text(d.featureTypes[0].properties[i].name + ' | ' + d.featureTypes[0].properties[i].type)).trigger("chosen:updated");
		}); 
		dropdownWMSAtts.trigger("chosen:updated");

		$('#WMScopyButton').click(function() {
			copyToClipboardMsg(document.getElementById("wms-feature-copy"), "wms-msg");
		});
		
		dropdownWMSAtts.chosen().change(function(e, params){
			//WMSerrorHideShow("wms-layer-atts");
			selectedAtts = '';
			var myValues = $('#wms-atts').chosen().val();
			$.each(myValues,function(i, selected) {
				var cleanAttr = selected.split(' | ');
				selectedAtts += cleanAttr[0] + ",";
			});
			$('#wms-feature-copy').empty().append(selectedAtts);
			var finishedWMSURL = encodeURI(strippedWMS + workspace + "/ows?service=wfs&version=1.1.0&request=getfeature&MAXFEATURES=9999&typename=" + workspace+ ":" + layerName + "&PROPERTYNAME="+selectedAtts+"&outputFormat=application/json");
			if ($("input[data-drupal-selector=edit-inline-entity-form-field-data-rest-url-0-value]").length){
				$("input[data-drupal-selector=edit-inline-entity-form-field-data-rest-url-0-value]").val(finishedWMSURL);
				$("input[data-drupal-selector=edit-inline-entity-form-field-rest-field-context-0-value]").val("features");
			} else if ($("input[data-drupal-selector=edit-field-data-rest-url-0-value]").length) {
				$("input[data-drupal-selector=edit-field-data-rest-url-0-value]").val(finishedWMSURL);
				$("input[data-drupal-selector=edit-field-rest-field-context-0-value]").val("features");
			}
			
		});
	}

	function copyToClipboardMsg(elem, msgElement) {
	    var succeed = copyToClipboard(elem);
		var msg;
		if (!succeed) {
			$( "div#wms-errors" ).empty().removeClass("alert-success").addClass("alert-danger").html('Copy not supported or blocked.  Press Ctrl+c to copy.');
		} else {
			$( "div#wms-errors" ).empty().removeClass("alert-danger").addClass("alert-success").html('Text copied to the clipboard.');
		}
	}
	function copyToClipboard(copyTarget) {
		// select the content
		copyTarget.select();
		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		return succeed;
	}
	
});

/* jQuery(function () {
  //Drupal.attachBehaviors(document, Drupal.settings);
  Drupal.attachBehaviors(jQuery("#drupal-off-canvas").get(0));
}); */



