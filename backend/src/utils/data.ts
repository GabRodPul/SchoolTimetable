import { BelongsToManyOptions, BelongsToOptions, DataType, DataTypes, HasManyOptions, HasOneOptions, Model, ModelStatic } from "sequelize";

export const defineId = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}

export const reference = (type: DataType, model: string, key: string) => ({ 
    type,
    references: { model, key }
})

export const referenceId = (model: string) => reference(DataTypes.INTEGER, model, "id");

export const relationship = <T1 extends Model, T2 extends Model>(
    t1:     ModelStatic<T1>,
    r1:     { h: "hasOne",        opt?: HasOneOptions  } |
            { h: "hasMany",       opt?: HasManyOptions },
    t2:     ModelStatic<T2>,
    r2:     { b: "belongsTo",     opt?: BelongsToOptions     } |
            { b: "belongsToMany", opt : BelongsToManyOptions },
) => {
    t1[r1.h](t2, r1.opt);

    // @ts-expect-error
    // This throws a compile-time error even without ?
    // because the "through" property exists only in one,
    // Who cares. 
    t2[r2.b](t1, r2.opt);
};

export const currDate = () => {
    const now = Date.now();
    return { createdAt: now, updatedAt: now };
}
