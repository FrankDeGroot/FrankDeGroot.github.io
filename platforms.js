'use strict'

const PLATFORM = 'platform'
export default function (scene) {
    scene.load.image(PLATFORM, 'assets/platform.png')
    var group
    return {
        group: () => group,
        create: () => {
            group = scene.physics.add.staticGroup()
            group.create(400, 568, PLATFORM).setScale(2).refreshBody()
            group.create(600, 400, PLATFORM)
            group.create(50, 250, PLATFORM)
            group.create(750, 220, PLATFORM)
        }
    }
}
