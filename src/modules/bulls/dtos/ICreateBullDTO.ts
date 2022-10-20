interface ICreateBullDTO {
    register_id: string;
    name: string;
    gender: string;
    first_level_parent?: string;
    second_level_parent?: string;
    third_level_parent?: string;
}

export { ICreateBullDTO };
