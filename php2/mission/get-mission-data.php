<?php

$query = 'select 
	salubrin_forest,
	tendolin_meadows,
	greenthorn_cavern,
	riven_grotto,
	lanfeld_outpost,
	braxxens_bastille,
	kordata_marshlands,
	arcturins_crypt,
	fahlnir_citadel,
	kordata_ruins,
	temple_of_prenssor,
	vistons_redoubt,
	galeblast_fortress,
	ashenflow_peak,
	dire_sanctum,
	nimgaul 
	from `ng2_missions` 
	where c_id=? 
	limit 1';

$stmt = $link->prepare($query);
$stmt->bind_param('s', $_SESSION['ng2']['row']);
$stmt->execute();
$stmt->bind_result(
	$salubrin_forest,
	$tendolin_meadows,
	$greenthorn_cavern,
	$riven_grotto,
	$lanfeld_outpost,
	$braxxens_bastille,
	$kordata_marshlands,
	$arcturins_crypt,
	$fahlnir_citadel,
	$kordata_ruins,
	$temple_of_prenssor,
	$vistons_redoubt,
	$galeblast_fortress,
	$ashenflow_peak,
	$dire_sanctum,
	$nimgaul
);
$_SESSION['mission'] = [];
$r['mission'] = [];
while ($stmt->fetch()) {
	$r['mission'] = [
		'salubrinForest' => $salubrin_forest,
		'tendolinMeadows' => $tendolin_meadows,
		'greenthornCavern' => $greenthorn_cavern,
		'rivenGrotto' => $riven_grotto,
		'lanfeldOutpost' => $lanfeld_outpost,
		'braxxensBastille' => $braxxens_bastille,
		'kordataMarshlands' => $kordata_marshlands,
		'arcturinsCrypt' => $arcturins_crypt,
		'fahlnirCitadel' => $fahlnir_citadel,
		'kordataRuins' => $kordata_ruins,
		'templeOfPrenssor' => $temple_of_prenssor,
		'vistonsRedoubt' => $vistons_redoubt,
		'galeblastFortress' => $galeblast_fortress,
		'ashenflowPeak' => $ashenflow_peak,
		'direSanctum' => $dire_sanctum,
		'nimgaul' => $nimgaul
	];
}