export const IMPORT_PROPERTIES = {
    province: ['province_id', 'province_name', 'population', 'population_density'],
    distance: ['province_id_1', 'province_id_2', 'distance'],
    pandemic: ['pandemic_id', 'pandemic_name'],
    supply_type: ['id', 'name'],
    supply_map_pandemic: ['pandemic_id', 'supply_type_id'],
    medical_suppy: ['supply_id', 'supply_type_id', 'supply_name'],
    infection_situation: ['province_id', 'pandemic_id', 'date', 'quantity_in_today', 'total_quantity'],
    recovered_situation: ['province_id', 'pandemic_id', 'date', 'quantity_in_today', 'total_quantity'],
    death_situation: ['province_id', 'pandemic_id', 'date', 'quantity_in_today', 'total_quantity'],
    level: ['province_id', 'pandemic_id', 'date', 'level'],
    supply_quantity: ['province_id', 'supply_id', 'quantity'],
    supply_ability: ['pandemic_id', 'province_id', 'supply_type_id', 'supply_quantity', 'ability'],
}