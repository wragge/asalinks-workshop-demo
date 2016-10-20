import os
import cv2
import cv2.cv as cv

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
IMAGE_DIR = os.path.join(CURRENT_DIR, 'docs', 'images')
CROP_DIR = os.path.join(CURRENT_DIR, 'faces')

# Change this if necessary
FACE_CLASSIFIER = '/usr/local/Cellar/opencv/2.4.12/share/OpenCV/haarcascades/haarcascade_frontalface_default.xml'


face_cl = cv2.CascadeClassifier(FACE_CLASSIFIER)
crop_file = '{}/{}-{}.jpg'
for file in os.listdir(IMAGE_DIR):
    if file[-3:] == 'jpg':
        f = 1
        print 'Processing {}'.format(file)
        try:
            image = cv2.imread(os.path.join(IMAGE_DIR, file), 0)
            faces = face_cl.detectMultiScale(image, scaleFactor=1.3, minNeighbors=4, minSize=(50, 50), flags=cv.CV_HAAR_SCALE_IMAGE)
            print faces
        except cv2.error:
            raise
        else:
            for (x, y, w, h) in faces:
                face = image[y: y + h, x: x + w]
                print crop_file.format(CROP_DIR, os.path.splitext(os.path.basename(file))[0], f)
                cv2.imwrite(crop_file.format(CROP_DIR, os.path.splitext(os.path.basename(file))[0], f), face)
                f += 1
