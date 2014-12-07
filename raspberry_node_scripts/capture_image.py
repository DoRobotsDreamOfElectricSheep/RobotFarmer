from SimpleCV import Camera

myCamera = Camera(prop_set={'width' : 320, 'height' : 240})

frame = myCamera.getImage()
frame.save("../arm_images/arm_image.jpg")
