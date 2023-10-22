import 'package:flutter/material.dart';
import 'package:mobile/screen/component/dialoglogout.dart';
import 'package:mobile/screen/component/webviewconnect.dart';

class myHome extends StatefulWidget {
  final String token;
  const myHome({Key? key, required this.token}) : super(key: key);

  @override
  _myHomeState createState() => _myHomeState();
}

class Area {
  final int id;
  final String title;
  final Action actions;
  final Reaction reactions;
  final bool active;

  Area({
    required this.id,
    required this.title,
    required this.actions,
    required this.reactions,
    this.active = false,
  });
}

class Action {
  final String serviceName;
  final String actionName;
  final Image image;

  Action({
    required this.serviceName,
    required this.actionName,
    required this.image,
  });
}

class Reaction {
  final String serviceName;
  final String reactionName;
  final Image image;

  Reaction({
    required this.serviceName,
    required this.reactionName,
    required this.image,
  });
}

List<Area> areas = [
  Area(
    id: 1,
    title: "AREA 1",
    actions: Action(
      serviceName: "Twitter",
      actionName: "When I tweet",
      image: Image.asset("assets/images/twitter.png"),
    ),
    reactions: Reaction(
      serviceName: "Google",
      reactionName: "Send an email",
      image: Image.asset("assets/images/google.png"),
    ),
    active: true,
  ),
  Area(
      id: 2,
      title: "AREA 2",
      actions: Action(
        serviceName: "Facebook",
        actionName: "When I post a photo",
        image: Image.asset("assets/images/facebook.png"),
      ),
      reactions: Reaction(
        serviceName: "Discord",
        reactionName: "Send a message",
        image: Image.asset("assets/images/discord.png"),
      ),
      active: true),
  Area(
      id: 3,
      title: "AREA 3",
      actions: Action(
        serviceName: "Facebook",
        actionName: "When I post a photo",
        image: Image.asset("assets/images/facebook.png"),
      ),
      reactions: Reaction(
        serviceName: "Discord",
        reactionName: "Send a message",
        image: Image.asset("assets/images/discord.png"),
      ),
      active: false),
];

class Services {
  final String serviceName;
  final Image image;
  final String url;
  final String callbackUrl;

  Services({
    required this.serviceName,
    required this.image,
    required this.url,
    required this.callbackUrl,
  });
}

List<Services> services = [
  Services(
    serviceName: "Github",
    image: Image.asset("assets/images/github.png"),
    url: "https://are4-51.com:8080/api/auth/GitHub",
    callbackUrl: "https://are4-51.com:8081",
  ),
  Services(
    serviceName: "Outlook",
    image: Image.asset("assets/images/outlook.png"),
    url: "https://are4-51.com:8080/api/auth/Outlook",
    callbackUrl: "https://are4-51.com:8081",
  ),
  Services(
    serviceName: "Spotify",
    image: Image.asset("assets/images/spotify.png"),
    url: "https://are4-51.com:8080/api/auth/spotify",
    callbackUrl: "https://are4-51.com:8081",
  ),
];

void showDeleteConfirmationDialog(BuildContext context, int id) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('Delete Area'),
        content: Text('Are you sure you want to delete this area $id ?'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              print("delete area $id");
            },
            child: const Text('Yes'),
          ),
        ],
      );
    },
  );
}

class _myHomeState extends State<myHome> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      appBar: AppBar(
        title: const Text('Home'),
        backgroundColor: const Color.fromRGBO(30, 41, 133, 1),
        actions: [
          IconButton(
              onPressed: () {
                showLogoutConfirmationDialog(context);
              },
              icon: const Icon(Icons.logout))
        ],
      ),
      drawer: SideBar(),
      body: Container(
        padding: const EdgeInsets.only(left: 15, top: 20, right: 15),
        child: ListView(
          children: [
            const Text(
              "My Areas",
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 30),
            ...areas.map((area) => areaCard(area)).toList()
          ],
        ),
      ),
    );
  }

  Widget SideBar() {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Color.fromRGBO(30, 41, 133, 1),
            ),
            child: Text(
              'Services',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ...services.map((service) => servicecard(service)).toList()
        ],
      ),
    );
  }

  Widget servicecard(Services service) {
    return Center(
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
          side: const BorderSide(
            color: Color.fromRGBO(30, 41, 133, 1),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            ListTile(
              leading: service.image,
              title: Text(
                service.serviceName,
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ButtonBar(
              children: <Widget>[
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => WebViewConnect(
                                  apiUrl: service.url,
                                  urlCallBack: service.callbackUrl,
                                  token: widget.token,
                                )));
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromRGBO(30, 41, 133, 1),
                  ),
                  child: const Text('Connect'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget areaCard(Area area) {
    return Center(
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
          side: const BorderSide(
            color: Color.fromRGBO(30, 41, 133, 1),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                area.title,
                style: const TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              leading: area.actions.image,
              title: Text(
                area.actions.serviceName,
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(area.actions.actionName),
            ),
            ListTile(
              leading: area.reactions.image,
              title: Text(
                area.reactions.serviceName,
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(area.reactions.reactionName),
            ),
            ButtonBar(
              children: <Widget>[
                Switch(
                  activeColor: Colors.black,
                  value: area.active,
                  onChanged: (value) {},
                ),
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () {
                    showDeleteConfirmationDialog(context, area.id);
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
