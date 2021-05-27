FROM node:14

# Separation of dev/prod images and multi-stage builds is left as an exercise for the reader
COPY . .

# We need to tell Node to trust the emulator cert, so we invoke a Bash script as a launcher
CMD /bin/bash ./entrypoint.sh
