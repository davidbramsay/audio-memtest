var fs = require('fs');

/*
//for use with smaller subset audio_file list
const AUDIO_FILES = [
"https://keyword.media.mit.edu/shared/natural_sounds//woman_screaming_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//dogs_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//circular_saw_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//bats_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//snoring_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//shower_-9dBA.wav"
];

const AUDIO_FILES = [
'https://keyword.media.mit.edu/shared/ambiguous_sounds//valve_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//subway_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//253492__fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//horse_fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//plane_crash_fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//stapler_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//fire_alarm_fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//splash_fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//axe_sharpen_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//glasses_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//turkey_5_20_0.7_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//machine_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//grasshopper_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//tea_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//337621__fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//motorcycle_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//punch_5_20_0.1_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//coffee_machine_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//washing_machine_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//faucet_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//pig_30_5_0.7_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//soda_can_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//car_(starting)_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//sweeping_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//projector_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//knives_fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//rattlesnake_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//music_box_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//whistling_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//pouring_soda_-9dBA.wav',
'https://keyword.media.mit.edu/shared/ambiguous_sounds//(electric)_razor_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//racecar_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//typewriter_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//laughing_(crowd)_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//footsteps_fx_final_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//coins_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//plane_crash_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//man_screaming_-9dBA.wav',
'https://keyword.media.mit.edu/shared/natural_sounds//firetruck_-9dBA.wav',
'https://keyword.media.mit.edu/shared/final_morph//donkey_fx_final_-9dBA.wav'
];
*/


//for use with full audio_file list!!
const AUDIO_FILES = [
"https://keyword.media.mit.edu/shared/natural_sounds//(car)_horn_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(computer)_mouse_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(hand)_saw_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(police)_siren_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(ship)_horn_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(table)_saw_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(train)_horn_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//(turning)_page_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//accordion_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//airplane_(flyby)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//airplane_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//announcement_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//arcade_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//baby_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//baby_crying_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//baggage_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//battle_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//bears_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//bee_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//bells_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//bird_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//blackboard_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//brushing_teeth_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//burning_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//burp_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//campfire_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//cannon_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//car_(starting)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//car_crash_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//car_trouble_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//cat_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//cheering_crowd_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//choir_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//cicadas_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//clock_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//coins_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//coughing_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//cows_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//creek_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//cricket_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//crows_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//crunching_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//digging_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//dirt_bike_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//dog_growl_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//dogs_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//donkey_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//door_(lock)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//drill_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//drum_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//ducks_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//elephant_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//faucet_(drip)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//faucet_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//feedback_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//fire_alarm_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//firetruck_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//fireworks_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//flute_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//footsteps_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//frogs_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//geese_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//goat_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//grasshopper_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//guitar_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//gunshot_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//helicopter_(landing)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//hen_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//hole_punch_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//horse_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//jackhammer_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//keys_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//knives_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//knocking_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//laugh_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//laughing_(crowd)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//lions_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//machine_gun_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//man_screaming_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//marchingband2_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//microwave_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//mosquito_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//music_box_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//opera_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//organ_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//paper_(tearing)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//pencil_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//phone_(ring)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//phone_(vibrating)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//pig_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//ping_pong_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//plane_crash_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//plates_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//police_(cars)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//popcorn_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//pouring_soda_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//punch_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//racecar_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//rain_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//rattlesnake_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//roller_coaster_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//rooster_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//school_bell_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//scissors_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//seals_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//sheep_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//sneeze_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//snoring_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//soda_can_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//splash_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//sweeping_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//talking_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//tennis_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//thunder_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//thunderstorm_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//toilet_(flush)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//traffic_jam_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//train_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//trumpet_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//turkey_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//typewriter_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//typing_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//violin_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//vomit_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//water_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//whip_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//whistle_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//whistling_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//wind_chimes_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//windshield_wiper_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//woman_crying_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//woman_screaming_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//yawn_-9dBA.wav",
"https://keyword.media.mit.edu/shared/natural_sounds//zipper_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//(electric)_razor_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//(lawn)_sprinkler_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//(sliding)_chair_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//(tornado)_siren_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//(winding)_clock_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//(woodburning)_stove_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//air_conditioner_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//ambulance_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//ants_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//axe_sharpen_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//bats_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//binder_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//blacksmith_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//boat_ramp_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//bottle_cap_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//bread_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//buffalo_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//bullet_(casing)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//buskers_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//car_trunk_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//carousel_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//chainsaw_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//chopping_(wood)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//circular_saw_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//coffee_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//construction_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//copy_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//coyote_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//crow_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//dentist_drill_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//dish_(falling)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//dishes_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//door_(closing)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//door_(opening)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//dryer_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//duct_tape_-9dBA_final.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//egg_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//explosion_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//fire_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//firecracker_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//forest_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//frying_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//garage_opener_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//gate_(latch)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//gecko_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//gibbons_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//glasses_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//grasshoppers_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//highway_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//ice_cream_truck_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//kettle_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//knife_cutting_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//lawn_mower_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//leaves_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//marketplace_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//marsh_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//metal_(clunk)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//metal_gate_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//motorcycle_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//motors_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//oven_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//park_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//pile_driver_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//playground_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//printer_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//printing_press_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//projector_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//refrigerator_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//restaurant_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//river_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//rocket_(launch)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//sail_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//school_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//sea_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//seagulls_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//seal_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//sewing_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//shovel_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//shower_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//skateboard_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//snowshoes_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//squirrel_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//stapler_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//steam_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//street_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//subway_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//tank_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//tape_recorder_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//tea_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//toaster_oven_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//traffic_sign_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//train_(engine)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//tree_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//truck_(idling)_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//tugboat_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//vacuum_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//valve_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//village_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//volcano_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//washing_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/ambiguous_sounds//wind_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//(computer)_mouse_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//(police)_siren_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//(train)_horn_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//220871__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//233980__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//253492__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//260580__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//324619__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//335538__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//337538__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//337621__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//338704__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//340270__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//343760__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//344616__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//345082__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//348249__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//351517__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//386061__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//391644__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//407642__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//51310__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//63373__fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//air_conditioner_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//airplane_(flyby)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//airplane_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//announcement_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//ants_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//axe_sharpen_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//baby_crying_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//baby_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//baggage_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//bats_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//battle_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//bears_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//bee_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//binder_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//bird_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//blackboard_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//blacksmith_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//boat_ramp_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//bread_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//brushing_teeth_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//buffalo_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//burp_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//buskers_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//cannon_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//car_(starting)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//car_crash_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//car_trouble_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//car_trunk_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//cat_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//chainsaw_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//cheering_crowd_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//choir_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//chopping_(wood)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//chopping_wood_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//clock_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//coffee_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//coins_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//copy_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//cows_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//coyote_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//crow_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//dentist_drill_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//dirt_bike_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//dish_falling_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//dishes_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//dogs_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//donkey_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//door_(lock)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//door_closing_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//drill_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//drum_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//ducks_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//duct_tape_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//egg_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//faucet_(drip)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//fire_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//fire_alarm_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//firecracker_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//firetruck_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//footsteps_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//forest_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//garage_opener_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//gate_latch_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//gecko_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//gibbons_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//glasses_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//goat_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//guitar_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//helicopter_(landing)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//hole_punch_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//horse_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//ice_cream_truck_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//kettle_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//keys_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//knife_cutting_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//knives_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//knocking_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//lawn_sprinkler_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//machine_gun_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//man_screaming_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//marsh_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//metal_clunk_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//metal_gate_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//microwave_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//mosquito_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//motorcycle_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//motors_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//music_box_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//oven_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//paper_(tearing)_5_20_0.1_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//paper_(tearing)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//phone_(vibrating)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//pig_30_5_0.7_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//pile_driver_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//plane_crash_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//police_(cars)_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//printer_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//printing_press_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//punch_5_20_0.1_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//punch_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//sail_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//scissors2_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//scissors_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//seagulls_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//seal_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//sewing_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//sheep_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//shovel_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//shower_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//skateboard_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//sliding_chair_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//snoring_5_20_0.1_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//snoring_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//soda_can_30_20_0.7_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//soda_can_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//splash_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//squirrel_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//stapler_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tank_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tape_recorder_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tea_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tennis_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//toaster_oven_5_20_0.7_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tornado_siren_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//traffic_jam_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//traffic_sign_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//train_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tree_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//tugboat_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//turkey_5_20_0.7_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//turkey_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//typewriter_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//vacuum_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//vomit_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//washing_machine_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//whip_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//whistle_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//winding_clock_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//windshield_wiper_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//woman_crying_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//woman_screaming_fx_final_-9dBA.wav",
"https://keyword.media.mit.edu/shared/final_morph//woodburning_stove_-9dBA.wav"
];

module.exports = function(app, db) {

    app.post('/memtest', (req, res) => {
        const newGame = new db.gameModel(req.body);
        newGame.save(function(err) {
                if(err) {
                    console.log('Error saving : ' + err);
                    res.status(400).send('unable to add to database');
                } else {
                    console.log('Game saved.')
                    res.send('Success!');
                }
        });
    });

    app.get('/memtest', (req, res) => {
        db.gameModel.find({}, function(err, games) {
            if(err) {
                console.log('Error sending : ' + err);
                res.status(400).send('unable to access database');
            } else {
                console.log('got games');
                res.send(games);
            }
        });
    });

    app.post('/memtest-user', (req, res) => {
        const newUser = new db.userModel(req.body);
        newUser.save(function(err) {
                if(err) {
                    console.log('Error saving : ' + err);
                    res.status(400).send('unable to add to database');
                } else {
                    console.log('User saved.')
                    res.send('Success!');
                }
        });
    });

    app.get('/memtest-user', (req, res) => {
        db.userModel.find({}, function(err, users) {
            if(err) {
                console.log('Error sending : ' + err);
                res.status(400).send('unable to access database');
            } else {
                console.log('got users');
                res.send(users);
            }
        });
    });

    app.get('/memtest-target', (req, res) => {
        //should provide 8 target samples who need a data point given our
        //target_samples and elimination criteria
        //
        //always select samples with the lowest number of HITS

        //for use with full audio_file list!!
        let NUM_RESPONSE = 8; //max number of tests someone can do without sounds repeating

        //for use with smaller subset audio_file list
        //let NUM_RESPONSE = 6; //max number of tests someone can do without sounds repeating

        let dict = {};
        for (f in AUDIO_FILES){
            dict[AUDIO_FILES[f]] = 0;
        }

        let rev_dict = new Array(25).fill().map(()=>[]);

        let ret_vals = [];

        db.gameModel.find({}, function(err, games) {
            if(err) {
                console.log('Error sending : ' + err);
                res.status(400).send('unable to access database');
            } else {

                for (i in games) {
                    //for use with full audio_file list!!
                    if (games[i]['vPercent'] > 0.6 && games[i]['falsePositives'] < 0.4){
                        let filename = games[i]['fileList'][games[i]['tLocation'][0]];
                        dict[filename] += 1;
                    }

                    //for use with smaller subset audio_file list
                    /*
                    let filename = games[i]['fileList'][games[i]['tLocation'][0]];
                    if (games[i]['vPercent'] > 0.6 && games[i]['falsePositives'] < 0.4 && AUDIO_FILES.includes(filename)){
                        dict[filename] += 1;
                    }
                    */

                }
                for (i in dict){

                    if (dict[i] < rev_dict.length){
                        rev_dict[dict[i]].push(i);
                    } else {
                        rev_dict[rev_dict.length - 1].push(i);
                    }

                }

                let curr_index = 0;
                for (i=0; i < NUM_RESPONSE; i++){
                    while (rev_dict[curr_index].length == 0){
                        curr_index = curr_index + 1;
                    }
                        ret_vals.push(rev_dict[curr_index].splice(Math.random()*rev_dict[curr_index].length, 1));
                }

                res.send(ret_vals);
            }
        });

    });

    app.get('/memtest-mt-identifier', (req, res) => {
        console.log(process.cwd());
        filename = './server/hit_values.txt'
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                    res.status(400).send('unable to access database');
            }

            var linesExceptFirst = data.split('\n').slice(1).join('\n');
            console.log(linesExceptFirst);
            fs.writeFile(filename, linesExceptFirst, function(err){
                if (err) {
                    console.log(err);
                        res.status(400).send('unable to access database');
                }
            });

            if (data.split('\n')[0] == '') {
                res.send('All HITs are now accounted for.  If you believe you have received this message in error, please contact davidr@mit.edu');
            }else {
                res.send(data.split('\n')[0]);
            }
        });
    });
};
