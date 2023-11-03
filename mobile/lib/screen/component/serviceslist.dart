import 'package:flutter/material.dart';

class Services {
  final int id;
  final String serviceName;
  final Image image;
  final String url;
  final String callbackUrl;
  final bool auth;

  Services({
    required this.id,
    required this.serviceName,
    required this.image,
    required this.url,
    required this.callbackUrl,
    required this.auth,
  });
}

List<Services> services = [
  Services(
    id: 1,
    serviceName: "Github",
    image: Image.asset("assets/images/github.png"),
    url: "https://are4-51.com:8080/api/auth/GitHub",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 2,
    serviceName: "Google",
    image: Image.asset("assets/images/google.png"),
    url: "https://are4-51.com:8080/api/auth/google",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 3,
    serviceName: "Microsoft",
    image: Image.asset("assets/images/outlook.png"),
    url: "https://are4-51.com:8080/api/auth/Microsoft",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 4,
    serviceName: "Spotify",
    image: Image.asset("assets/images/spotify.png"),
    url: "https://are4-51.com:8080/api/auth/spotify",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 5,
    serviceName: "Instagram",
    image: Image.asset("assets/images/instagram.png"),
    url: "https://are4-51.com:8080/api/auth/instagram",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 6,
    serviceName: "Notion",
    image: Image.asset("assets/images/notion.png"),
    url: "https://are4-51.com:8080/api/auth/notion",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 7,
    serviceName: "Figma",
    image: Image.asset("assets/images/figma.png"),
    url: "https://are4-51.com:8080/api/auth/figma",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 8,
    serviceName: "Linear",
    image: Image.asset("assets/images/linear.png"),
    url: "https://are4-51.com:8080/api/auth/linear",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 9,
    serviceName: "Gitlab",
    image: Image.asset("assets/images/gitlab.png"),
    url: "https://are4-51.com:8080/api/auth/gitlab",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 10,
    serviceName: "Twitch",
    image: Image.asset("assets/images/twitch.png"),
    url: "https://are4-51.com:8080/api/auth/twitch",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 11,
    serviceName: "Slack",
    image: Image.asset("assets/images/slack.png"),
    url: "https://are4-51.com:8080/api/auth/slack",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
  Services(
    id: 12,
    serviceName: "Dropbox",
    image: Image.asset("assets/images/dropbox.png"),
    url: "https://are4-51.com:8080/api/auth/Dropbox",
    callbackUrl: "https://are4-51.com:8081",
    auth: true,
  ),
];