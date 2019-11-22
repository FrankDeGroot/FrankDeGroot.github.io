'use strict'

export default function (all) {
    const values = Object.keys(all).map(k => all[k])
    const creates = values.filter(v => v.create)
    const updates = values.filter(v => v.update)
    const interacts = values.filter(v => v.interact)
    return {
        create: () => {
            creates.forEach(v => v.create())
            interacts.forEach(v => v.interact(all))
        },
        update: () => updates.forEach(v => v.update()),
    }
}
