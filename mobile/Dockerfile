FROM ghcr.io/cirruslabs/flutter:latest

WORKDIR /home/mobile
COPY . .

RUN flutter build apk --split-per-abi

RUN mkdir ../delivery

CMD cp build/app/outputs/flutter-apk/* ../delivery/
