 class Node 
     {
            constructor(val)
            {
                this.data = val;
                this.next = null;
            }
        }
 
    // Function that detects loop in the list
    function detectAndRemoveLoop(node) {
 
        // If list is empty or has only one node
        // without loop
        if (node == null || node.next == null)
            return;
 
        var slow = node, fast = node;
 
        // Move slow and fast 1 and 2 steps
        // ahead respectively.
        slow = slow.next;
        fast = fast.next.next;
 
        // Search for loop using slow and fast pointers
        while (fast != null && fast.next != null) {
            if (slow == fast)
                break;
 
            slow = slow.next;
            fast = fast.next.next;
        }
 
        /* If loop exists */
        if (slow == fast) {
            slow = node;
            if (slow != fast) {
                while (slow.next != fast.next) {
                    slow = slow.next;
                    fast = fast.next;
                }
                 
                /* since fast->next is the looping point */
                fast.next = null; /* remove loop */
            }
             
            /* This case is added if fast and 
            slow pointer meet at first position. */
            else {
                while (fast.next != slow) {
                    fast = fast.next;
                }
                fast.next = null;
            }
        }
    }
 
    // Function to print the linked list
    function printList(node) {
        while (node != null) {
            console.log(node.data + " ");
            node = node.next;
        }
    }
 
    // Driver code
        head = new Node(50);
        head.next = new Node(20);
        head.next.next = new Node(15);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(10);
 
        // Creating a loop for testing
        head.next.next.next.next.next = head.next.next;
        detectAndRemoveLoop(head);
        printList(headd);