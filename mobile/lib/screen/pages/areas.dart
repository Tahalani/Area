import 'package:flutter/material.dart';

class MyAreas extends StatefulWidget {
  final String token;
  const MyAreas({Key? key, required this.token}) : super(key: key);

  @override
  _MyAreasState createState() => _MyAreasState();
}

class Services {
  final String serviceName;
  final List<Action> actionName;
  final List<Reaction> reactionName;
  final Image image;

  Services({
    required this.serviceName,
    required this.actionName,
    required this.reactionName,
    required this.image,
  });
}

class Action {
  final String actionName;

  Action({
    required this.actionName,
  });
}

class Reaction {
  final String reactionName;

  Reaction({
    required this.reactionName,
  });
}

List<Services> services = [
  Services(
    serviceName: "Twitter",
    actionName: [
      Action(
        actionName: "TW Action 1",
      ),
      Action(
        actionName: "TW Action 2",
      )
    ],
    reactionName: [
      Reaction(
        reactionName: "TW Reaction 1",
      ),
      Reaction(
        reactionName: "TW Reaction 2",
      )
    ],
    image: Image.asset("assets/images/twitter.png", height: 30, width: 30),
  ),
  Services(
    serviceName: "Facebook",
    actionName: [
      Action(
        actionName: "FB Action 1",
      ),
      Action(
        actionName: "FB Action 2",
      ),
      Action(
        actionName: "FB Action 3",
      )
    ],
    reactionName: [
      Reaction(
        reactionName: "FB Reaction 1",
      ),
      Reaction(
        reactionName: "FB Reaction 2",
      ),
    ],
    image: Image.asset(
      "assets/images/facebook.png",
      height: 30,
      width: 30,
    ),
  ),
  Services(
    serviceName: "Google",
    actionName: [
      Action(
        actionName: "Google Action 1",
      ),
      Action(
        actionName: "Google Action 2",
      ),
    ],
    reactionName: [
      Reaction(
        reactionName: "Google Reaction 1",
      ),
    ],
    image: Image.asset(
      "assets/images/google.png",
      height: 30,
      width: 30,
    ),
  ),
  Services(
    serviceName: "Discord",
    actionName: [
      Action(
        actionName: "Action Discord 1",
      ),
      Action(
        actionName: "Action Discord 2",
      ),
    ],
    reactionName: [
      Reaction(
        reactionName: "Reaction Discord 1",
      ),
      Reaction(
        reactionName: "Reaction Discord 2",
      ),
    ],
    image: Image.asset(
      "assets/images/discord.png",
      height: 30,
      width: 30,
    ),
  ),
];

class _MyAreasState extends State<MyAreas> {
  String? selectedService1;
  String? selectedAction;
  String? selectedService2;
  String? selectedReaction;
  TextEditingController areaTitleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      appBar: AppBar(
        title: const Text('Areas'),
        backgroundColor: Colors.black,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Card(
          elevation: 5,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
            side: const BorderSide(
              color: Color.fromRGBO(30, 41, 133, 1),
              width: 1,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: TextField(
                    controller: areaTitleController,
                    decoration: const InputDecoration(
                      hintText: 'Titre AREA',
                    ),
                  ),
                ),
                FieldServiceAction(),
                if (selectedService1 != null) FieldAction(),
                if (selectedAction != null) FieldServiceReaction(),
                if (selectedService2 != null)
                  FieldReaction()
                else
                  const SizedBox(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget FieldServiceAction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            title: DropdownButton<String>(
              value: selectedService1,
              onChanged: (String? newValue) {
                setState(() {
                  selectedService1 = newValue;
                  selectedAction = null;
                  selectedReaction = null;
                });
              },
              items: services.map<DropdownMenuItem<String>>(
                (Services service) {
                  return DropdownMenuItem<String>(
                    value: service.serviceName,
                    child: Row(
                      children: [
                        service.image,
                        const SizedBox(width: 8),
                        Text(service.serviceName),
                      ],
                    ),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Sélectionnez un service'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldAction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            subtitle: DropdownButton<String>(
              value: selectedAction,
              onChanged: (String? newValue) {
                setState(() {
                  selectedAction = newValue;
                  selectedReaction = null;
                });
              },
              items: services
                  .firstWhere(
                      (service) => service.serviceName == selectedService1)
                  .actionName
                  .map<DropdownMenuItem<String>>(
                (Action action) {
                  return DropdownMenuItem<String>(
                    value: action.actionName,
                    child: Text(action.actionName),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Sélectionnez une action'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldServiceReaction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            title: DropdownButton<String>(
              value: selectedService2,
              onChanged: (String? newValue) {
                setState(() {
                  selectedService2 = newValue;
                  selectedReaction = null;
                });
              },
              items: services.map<DropdownMenuItem<String>>(
                (Services service) {
                  return DropdownMenuItem<String>(
                    value: service.serviceName,
                    child: Row(
                      children: [
                        service.image,
                        const SizedBox(width: 8),
                        Text(service.serviceName),
                      ],
                    ),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Sélectionnez un service'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldReaction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            subtitle: DropdownButton<String>(
              value: selectedReaction,
              onChanged: (String? newValue) {
                setState(() {
                  selectedReaction = newValue;
                });
              },
              items: services
                  .firstWhere(
                      (service) => service.serviceName == selectedService2)
                  .reactionName
                  .map<DropdownMenuItem<String>>(
                (Reaction reaction) {
                  return DropdownMenuItem<String>(
                    value: reaction.reactionName,
                    child: Text(reaction.reactionName),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Sélectionnez une reaction'),
            ),
          ),
        ],
      ),
    );
  }
}